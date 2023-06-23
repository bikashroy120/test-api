const express = require("express");
const { createColor, updateColor, getColor, getallColor, deleteColor } = require("../conttoller/collorConttoller");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer")
const router = express.Router();


router.post("/",authMiddleware,isAdmin,createColor)
router.put("/:id",authMiddleware,isAdmin,updateColor)
router.get("/:id",getColor)
router.get("/",getallColor)
router.delete("/",authMiddleware,isAdmin,deleteColor)



module.exports = router;