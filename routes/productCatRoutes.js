const express = require("express");
const { createCategory,getallCategory,updateCategory,getCategory,deleteCategory, getallCategory2 } = require("../conttoller/productCatCon");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer");
const upload = require("../middlewarer/upload");
const router = express.Router();



router.post("/",authMiddleware,createCategory)
router.get("/admin",getallCategory)
router.get("/:id",getCategory)
router.get("/",getallCategory2)
router.put("/:id",authMiddleware,updateCategory)
router.delete("/delete/:id",authMiddleware,isAdmin,deleteCategory)




module.exports = router;