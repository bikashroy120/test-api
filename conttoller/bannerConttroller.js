const Slyer = require("../models/slyderModal");
const asyncHandler = require("express-async-handler");

const createBanner = asyncHandler(async(req,res,next)=>{
    try {
        // const banner = await Banner.create(req.body)

        const newBanner = new Slyer({
            image:req.body.image,
            category:req.body.category,
        })  

        await newBanner.save()

        res.status(201).json({
            success:true,
            message:"banner create success",
            banner:newBanner
        })
    } catch (error) {
        throw new Error(error);
    }
})


const getBanner = asyncHandler(async(req,res,next)=>{
    try {
        const banner = await Slyer.find()
        res.status(200).json({
            success:true,
            message:"get banner success",
            banner
        })
    } catch (error) {
        throw new Error(error);
    }
})


const deleteBanner = asyncHandler(async(req,res,next)=>{
    try {

        const {id} = req.params()

        const banner = await Slyer.findByIdAndDelete(id)

        res.status(201).json({
            success:true,
            message:"banner delete success",
            banner
        })
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {createBanner,getBanner,deleteBanner}