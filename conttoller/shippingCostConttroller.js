const ShippingCost = require("../models/shippingCostModal")
const asyncHandler = require("express-async-handler");


const createCost = asyncHandler(async (req, res) => {
  try {
    const newBCategory = await ShippingCost.create(req.body);
    res.json(newBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBCategory = await ShippingCost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCost = asyncHandler(async (req, res) => {
  try {
    const getallBCategory = await ShippingCost.find();
    res.json(getallBCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
    createCost,
    updateCost,
    getAllCost
};