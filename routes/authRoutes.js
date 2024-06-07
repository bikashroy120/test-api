const express = require("express");
const { creactUser, loginUserctrl, getallUser, getOneUser, deleteUser, updateUser, loginAdmin, getWishList, userCart, getUserCart, creactorder, getSingalOrder, getallUserOrder, getAllOrders, geDashbordData, updateOrderStatus, updatePassword, getUserById, updateUserAdmin, getallUserOrderAdmin, getDashboardAdminData, getTodayOrders, getAllOrdersAmin } = require("../conttoller/user-Controller");
const router = express.Router()
const {isAdmin,authMiddleware} = require("../middlewarer/authMiddlewarer");
const upload = require("../middlewarer/upload");


router.post("/regester", creactUser)
router.post("/login", loginUserctrl)
router.post("/login/admin", loginAdmin)
router.post("/add-cart",authMiddleware,userCart)
router.post("/add-order",authMiddleware,creactorder)
router.get("/user-order",authMiddleware,getallUserOrder)
router.get("/user-order/admin/:id",authMiddleware,getallUserOrderAdmin)
router.get("/all-order-admin",getAllOrdersAmin)
router.get("/one",authMiddleware, getOneUser)
router.get("/admin-dashboard",authMiddleware,isAdmin,getDashboardAdminData)
router.get("/admin-dashboard-today",authMiddleware,isAdmin,getTodayOrders)
router.get("/all-order",authMiddleware,getAllOrders)
router.get("/order/:id",authMiddleware,getSingalOrder)
router.get("/:id",authMiddleware,getUserById)
router.get("/dashborddata",authMiddleware,isAdmin,geDashbordData)
router.get("/get-cart",authMiddleware,getUserCart)
router.get("/",authMiddleware,isAdmin, getallUser)
router.get("/wishlist",authMiddleware,getWishList)
router.delete("/:id",authMiddleware,isAdmin, deleteUser)
router.put("/order-update/:id",authMiddleware,isAdmin, updateOrderStatus)
router.put("/update",authMiddleware, updateUser)
router.put("/update/:id",authMiddleware, updateUserAdmin)
router.put("/update-password",authMiddleware,updatePassword)


module.exports=router;
