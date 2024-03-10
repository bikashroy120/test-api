const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModal2");

const createCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItem, quantity } = req.body;

  try {
    const existingCart = Cart.findOne({ userId: _id });
    if (existingCart) {
      const existingProduct = existingCart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        existingCart.products.push({ cartItem, quantity });
      }

      await existingCart.save();
      res.status(200).json("Product added to cart");
    } else {
      const newCart = new Cart({
        userId: _id,
        products: [
          {
            cartItem,
            quantity: quantity,
          },
        ],
      });

      await newCart.save();
      res.status(200).json("Product added to cart");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const cart = await Cart.findOne({ userId: _id }).populate(
      "products.cartItem",
      "_id title price bprice category images"
    );
    res.status(200).json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCart = asyncHandler(async (req, res) => {
    const cartItemId = req.params.cartItemId;

    try {
        const updateCart = await Cart.findOneAndUpdate(
            {'products._id':cartItemId},
            {$pull:{products:{_id:cartItemId}}},
            {new:true}
        )
         
        if(!updateCart){
            return res.status(404).json("Cart item not found")
        }

        res.status(200).json(updateCart)

    } catch (error) {
        throw new Error(error);
    }
});

const decCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItem } = req.body;
  try {
    const cart = await Cart.findOne({ userId: _id });
    if (!cart) {
      return res.status(404).json("cart not found");
    }

    const existingProduct = existingCart.products.find(
      (product) => product.cartItem.toString() === cartItem
    );

    if (!existingProduct) {
      return res.status(404).json("product not found");
    }

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter(
        (product) => product.cartItem.toString() !== cartItem
      );
    }else{
        existingProduct.quantity -= 1
    }

    await cart.save();

    if(existingProduct.quantity === 0){
        await cart.updateOne(
            { userId:_id},
            {$pull:{products:{cartItem}}}
        )
    }

    res.status(200).json("Product Update")

  } catch (error) {}
});

module.exports = {
  createCart,
  getCart,
  deleteCart,
  decCart
};
