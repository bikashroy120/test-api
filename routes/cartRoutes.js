const express = require("express");
const { authMiddleware } = require("../middlewarer/authMiddlewarer");
const { createCart, decCart, deleteCart, getCart } = require("../conttoller/cartConttoller");
const router = express.Router();

router.post("/",authMiddleware,createCart)
router.post("/quantity",authMiddleware,decCart)
router.get("/",getCart)
router.delete("/:cartItemId",authMiddleware,deleteCart)


module.exports = router;