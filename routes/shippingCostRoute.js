const express = require("express");
const { createCost, getAllCost, updateCost } = require("../conttoller/shippingCostConttroller");

router = express.Router();


router.post("/",createCost)
router.get("/",getAllCost)
router.put("/:id",updateCost)


module.exports = router;