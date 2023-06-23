const express = require("express");
const { createBCategory, updateBCategory, deleteBCategory, getBCategory, getallBCategory } = require("../conttoller/blogCategory");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer")
const 
router = express.Router();


router.post("/",authMiddleware,isAdmin,createBCategory)
router.put("/:id",authMiddleware,isAdmin,updateBCategory)
router.get("/:id",getBCategory)
router.get("/",getallBCategory)
router.delete("/",authMiddleware,isAdmin,deleteBCategory)



module.exports = router;