const express = require("express");
const { creactUser, loginUserctrl, getallUser, getOneUser, deleteUser, updateUser, loginAdmin, getWishList, userCart, getUserCart, creactorder, getSingalOrder, getallUserOrder } = require("../conttoller/user-Controller");
const router = express.Router()
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer")


router.post("/regester", creactUser)
router.post("/login", loginUserctrl)
router.post("/login/admin", loginAdmin)
router.post("/add-cart",authMiddleware,userCart)
router.post("/add-order",authMiddleware,creactorder)
router.get("/order/:id",authMiddleware,getSingalOrder)
router.get("/user-order",authMiddleware,getallUserOrder)
router.get("/get-cart",authMiddleware,getUserCart)
router.get("/",authMiddleware,isAdmin, getallUser)
router.get("/wishlist",authMiddleware,getWishList)
router.delete("/:id",authMiddleware,isAdmin, deleteUser)
router.put("/:id",authMiddleware, updateUser)
router.get("/:id",authMiddleware, getOneUser)


module.exports=router;
