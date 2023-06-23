const BCategory = require("../models/blogCategoryMadel");
const asyncHandler = require("express-async-handler");


const createBCategory = asyncHandler(async (req, res) => {
  try {
    const newBCategory = await BCategory.create(req.body);
    res.json(newBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBCategory = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBCategory = await BCategory.findByIdAndDelete(id);
    res.json(deletedBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
 
  try {
    const getaBCategory = await BCategory.findById(id);
    res.json(getaBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBCategory = asyncHandler(async (req, res) => {
  try {
    const getallBCategory = await BCategory.find();
    res.json(getallBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBCategory,
  updateBCategory,
  deleteBCategory,
  getBCategory,
  getallBCategory,
};