const Coupon = require("../models/cuponMadel");
const asyncHandler = require("express-async-handler");


const creactCoupon = asyncHandler(async(req,res)=>{
    try {
        const creact = await Coupon.create(req.body);
        res.json(creact);
    } catch (error) {
        throw new Error(error)
    }
});

const getallCoupon = asyncHandler(async(req,res)=>{
    try {

        let filters = { ...req.query };
        const excludesFields = [
          "limit",
          "page",
          "sort",
          "fields",
          "search",
          "searchKey",
          "modelName",
        ];
    
        excludesFields.forEach((field) => {
          delete filters[field];
        });
    
        let queryStr = JSON.stringify(filters);
        queryStr = queryStr.replace(/\b|gte|lte|lt\b/g, (match) => `${match}`);
        filters = JSON.parse(queryStr);
    
        if (req.query.search) {
          const search = req.query.search || "";
          // const regSearch = new RegExp('.*' + search + '.*','i')
          filters = {
            $or: [
              { title: { $regex: new RegExp(search, "i") } },
              { name: { $regex: new RegExp(search, "i") } },
            ],
          };
        }
        // common-----------------------------------
        let queries = {};
        // ------------pagination------------------
        if (req.query.limit | req.query.page) {
          const { page = 1, limit = 2 } = req.query;
          const skip = (page - 1) * +limit;
          queries.skip = skip;
          queries.limit = +limit;
        }
    
        const count = await Coupon.find(filters).countDocuments()
    
        const coupon = await Coupon
          .find(filters)
          .skip(queries.skip)
          .limit(queries.limit)
          .sort({ createdAt: -1 });
  
  
  
          res.status(200).json({
            success:true,
            item:count,
            coupon
          })
    } catch (error) {
        throw new Error(error)
    }
})

const singalCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const getall = await Coupon.findById(id);
        res.json(getall)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    try {
        const update = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
        res.json(update)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id}= req.params;

    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon) 
    } catch (error) {
        throw new Error(error)
    }
})


module.exports={creactCoupon,singalCoupon,getallCoupon,updateCoupon,deleteCoupon}