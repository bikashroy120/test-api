const Product = require("../models/productModel");
const User = require("../models/userModal")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify")
const fs = require('fs');

const   createProduct = asyncHandler(async (req, res) => {
    try {

      if(req.files){
        const newimage = []
        req.files.forEach((item)=>{
          newimage.push(item.filename)
        })

        req.body.images = newimage
      }



      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const tour = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      res.json(tour);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {

      const deleteProduct = await Product.findOneAndDelete(id);

      deleteProduct.images.forEach((filename) => {
        const filePath = `uploads/${filename}`;
        
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const findProduct = await Product.findById(id);
      res.json(findProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });


  const addToWishList = asyncHandler(async(req,res,next)=>{
      const {_id} = req.user;
      const {proId} = req.body;
      try {
        const user = await User.findById(_id);
        const alreadyAdd = user.wishlist.find((id)=>id._id.toString()===proId.toString());
        console.log(alreadyAdd)
        if(alreadyAdd){
          const user = await User.findByIdAndUpdate(_id,{
            $pull:{wishlist:proId}
          },{
            new:true,
            runValidators: true
          })
          res.json(user)
        }else{
          const user = await User.findByIdAndUpdate(_id,{
            $push:{wishlist:proId}
          },{new:true})
          res.json(user)
        }

      } catch (error) {
        throw new Error(error)
      }
  })

  const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,  
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
  });


  module.exports = {
    createProduct,
    getaProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    addToWishList,
    rating,
  };