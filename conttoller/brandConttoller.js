const Brand = require("../models/brandMadel");
const asyncHandler = require("express-async-handler");


const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBrand = asyncHandler(async (req, res) => {
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

    const getallBrand = await Brand.find(filters);
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);

   

  }
});
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};



