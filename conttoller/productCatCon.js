const Category = require("../models/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const fs = require('fs');


const createCategory = asyncHandler(async (req, res) => {
  req.body.image  = req.file.filename;
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});



const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    const categoty = await Category.findById(id)

    if(!categoty){
      res.status(404).json({message:"product not found"})
    }

    if(req.file){
      if(categoty.image){
        const filePath = `uploads/${categoty.image}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
        })
      }

      req.body.image = req.file.filename

    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  console.log(id)
  try {

    const categoty = await Category.findById(id)
    if(categoty.image){
      const filePath = `uploads/${categoty.image}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      })
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
 
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};