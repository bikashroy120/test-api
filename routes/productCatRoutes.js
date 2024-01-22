const express = require("express");
const { createCategory,getallCategory,updateCategory,getCategory,deleteCategory } = require("../conttoller/productCatCon");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer");
const upload = require("../middlewarer/upload");
const router = express.Router();



router.post("/",authMiddleware,createCategory)
router.put("/:id",authMiddleware,updateCategory)
router.get("/:id",getCategory)
router.get("/",getallCategory)
router.delete("/delete/:id",authMiddleware,isAdmin,deleteCategory)




module.exports = router;