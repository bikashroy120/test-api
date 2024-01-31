const express = require("express");
const router = express.Router();
const {authMiddleware,isAdmin} = require("../middlewarer/authMiddlewarer");
const { createBanner, getBanner } = require("../conttoller/bannerConttroller");




router.post("/",authMiddleware,isAdmin,createBanner)
router.get("/all-banner",getBanner)
router.delete("/delete-banner/:id",getBanner)


module.exports=router;