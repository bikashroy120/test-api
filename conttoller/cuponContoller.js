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
        const getall = await Coupon.find();
        res.json(getall)
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