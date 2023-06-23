const User  = require("../models/userModal")
const Cart = require("../models/cartMadel")
const Order = require("../models/orderNewModal")
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken")

const creactUser = asyncHandler(async(req,res,next)=>{
    const email = req.body.email;
    
    const findUser = await User.findOne({email:email})
    if(!findUser){
        const newUser = await User.create(req.body)
        res.json(newUser)
    }else{
        throw new Error("User Already Exists");
    }

})

const loginUserctrl = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;

    const findUser = await User.findOne({email:email})
    if(findUser && (findUser.password === password)){
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
        res.json({
            _id:findUser?._id,
            firstname:findUser?.fastname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credentials")
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (findAdmin.password === password)) {
      const refreshToken = generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  });
  
  // logout functionality
  
  const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });

const getallUser = asyncHandler(async (req,res)=>{
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

const getWishList = asyncHandler(async(req,res,next)=>{
        const {_id} = req.user;
    try {
        const wishlist = await User.findById(_id).populate("wishlist")

        res.json(wishlist)
    } catch (error) {
        throw new Error(error)
    }
})

const getOneUser = asyncHandler(async (req,res,next)=>{
    const {id} = req.params

    try {
        const getUser = await User.findById(id)
        res.json(getUser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req,res,next)=>{
    const {id} = req.params

    try {
        const getUser = await User.findByIdAndDelete(id)
        res.json({
            message:"user delete sussesfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})


const updateUser = asyncHandler(async (req,res,next)=>{
    const {id} = req.params

    try {
        const getUser = await User.findByIdAndUpdate(id,{
            fastname:req.body.fastname,
            lastname:req.body.lastname,
            mobile:req.body.mobile
        },
        {
            new:true
        })
        res.json({
            message:"user update sussesfully",
            
        })
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const block = User.findByIdAndUpdate(id,
            {isBlocked:true},
            {new:true})

           res.json({
            message:"User Blocked",
           }) 
    } catch (error) {
        throw new Error(error)
    }
});


const unblockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const unblock = User.findByIdAndUpdate(id,
            {isBlocked:true},
            {new:true})
            res.json({
                message:"User Blocked",
               }) 
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler(async (req, res) => {
    const { id,count } = req.body;
    const { _id } = req.user;
    try {
      let products = [];
      const user = await User.findById(_id);
      // check if user already have product in cart
      const alreadyExistCart = await Cart.findOne({ orderby: user._id });
      console.log(alreadyExistCart)
      if (alreadyExistCart) {
        // alreadyExistCart.remove();
        const alreadyProduct = alreadyExistCart.products.find(item=>item.product === id)

        console.log(alreadyProduct)

        let object = {};
        object.product = id;
        object.count = count;
        let getPrice = await Product.findById(id).select("price").exec();
        object.price = getPrice.price;

        let cartTotal = object.price * object.count;
        console.log(cartTotal)

        alreadyExistCart.products.push(object)
        alreadyExistCart.cartTotal = alreadyExistCart.cartTotal + cartTotal


        const updatepost = await alreadyExistCart.save()
        res.json(updatepost);

      }else{
        let object = {};
        object.product = id;
        object.count = count;
        let getPrice = await Product.findById(id).select("price").exec();
        object.price = getPrice.price;
        products.push(object);

      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      let newCart = await new Cart({
        products,
        cartTotal,
        orderby: user?._id,
      }).save();
      res.json(newCart);
      }

    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
      const cart = await Cart.findOne({ orderby: _id }).populate(
        "products.product"
      );
      res.json(cart);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
      const user = await User.findOne({ _id });
      const cart = await Cart.findOneAndRemove({ orderby: user._id });
      res.json(cart);
    } catch (error) {
      throw new Error(error);
    }
  });

  const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
      orderby: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderby: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
  });


  const creactorder = asyncHandler(async(req,res)=>{
    const { _id } = req.user;
      try {
          req.body.orderby = _id
          const order = await Order.create(req.body)
          res.json(order);
      } catch (error) {
        throw new Error(error);
      }
  })


  const getSingalOrder = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const singalOrder = await Order.findById(id)
        .populate({
          path: 'orderby',
          select: 'fastname lastname -wishlist'
        })
        res.json(singalOrder)
    } catch (error) {
      throw new Error(error)
    }
  })

  const getallUserOrder = asyncHandler(async(req,res)=>{
    const { _id } = req.user;

    try {
        const order =await Order.find({orderby:_id})
        const paddingOrder = order.filter(item=>item.orderStatus === "Pending")
        const Processing = order.filter(item=>item.orderStatus === "Processing")
        const Complete = order.filter(item=>item.orderStatus === "Complete")
        res.json({
          totalOrder:order.length,
          paddingOrder:paddingOrder.length,
          ProcessingOrder:Processing.length,
          CompleteOrder:Complete.length,
          order:order
        })

    } catch (error) {
      throw new Error(error)
    }

  })

  
  // const createOrder = asyncHandler(async (req, res) => {
  //   const { COD, couponApplied } = req.body;
  //   const { _id } = req.user;
  //   validateMongoDbId(_id);
  //   try {
  //     if (!COD) throw new Error("Create cash order failed");
  //     const user = await User.findById(_id);
  //     let userCart = await Cart.findOne({ orderby: user._id });
  //     let finalAmout = 0;
  //     if (couponApplied && userCart.totalAfterDiscount) {
  //       finalAmout = userCart.totalAfterDiscount;
  //     } else {
  //       finalAmout = userCart.cartTotal;
  //     }
  
  //     let newOrder = await new Order({
  //       products: userCart.products,
  //       paymentIntent: {
  //         id: uniqid(),
  //         method: "COD",
  //         amount: finalAmout,
  //         status: "Cash on Delivery",
  //         created: Date.now(),
  //         currency: "usd",
  //       },
  //       orderby: user._id,
  //       orderStatus: "Cash on Delivery",
  //     }).save();
  //     let update = userCart.products.map((item) => {
  //       return {
  //         updateOne: {
  //           filter: { _id: item.product._id },
  //           update: { $inc: { quantity: -item.count, sold: +item.count } },
  //         },
  //       };
  //     });
  //     const updated = await Product.bulkWrite(update, {});
  //     res.json({ message: "success" });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // });
  
  const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
      const userorders = await Order.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllOrders = asyncHandler(async (req, res) => {
    try {
      const alluserorders = await Order.find()
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(alluserorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const userorders = await Order.findOne({ orderby: id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
        },
        { new: true }
      );
      res.json(updateOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  });



module.exports = {getUserCart,userCart,getallUserOrder,getSingalOrder,creactorder,getWishList,loginAdmin,logout,handleRefreshToken,creactUser,blockUser,unblockUser,loginUserctrl,getallUser,getOneUser,deleteUser,updateUser}