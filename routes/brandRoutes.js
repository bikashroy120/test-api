const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getallBrand } = require("../conttoller/brandConttoller");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer")
const 
router = express.Router();


router.post("/",authMiddleware,isAdmin,createBrand)
router.put("/:id",authMiddleware,isAdmin,updateBrand)
router.get("/:id",getBrand)
router.get("/",getallBrand)
router.delete("/delete/:id",authMiddleware,isAdmin,deleteBrand)



module.exports = router;