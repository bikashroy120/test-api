const Category = require("../models/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const fs = require('fs');


const createCategory = asyncHandler(async (req, res) => {
  try {

    const data =  req.body;

    console.log("data=======",data)


    const newCategory = await Category.create(req.body);
    res.status(201).json({
      success:true,
      message:"category create success",
      category:newCategory
    });
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
        $or: [{ title: { $regex: new RegExp(search, "i") } }],
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

    // single with multi sorting
    if (req.query.sort) {
      let sortCateory = req.query.sort;
      sortCateory = sortCateory.split(",").join(" ");
      queries.sort = sortCateory;
    } else {
      queries.sort = { createdAt: -1 };
    }


    const getallCategory = await Category
    .find(filters)
    // .skip(queries.skip)
    // .limit(queries.limit)
    // .select(queries.fields)
    // .sort(queries.sort);



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