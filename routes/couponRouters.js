const express = require("express");
const { creactCoupon,getallCoupon,updateCoupon,deleteCoupon, singalCoupon } = require("../conttoller/cuponContoller");
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer")
const router = express.Router();


router.post("/",authMiddleware,isAdmin,creactCoupon);
router.get("/",authMiddleware,isAdmin,getallCoupon);
router.get("/:id",authMiddleware,isAdmin,singalCoupon);
router.put("/:id",authMiddleware,isAdmin,updateCoupon);
router.delete("/:id",authMiddleware,isAdmin,deleteCoupon);


module.exports = router;