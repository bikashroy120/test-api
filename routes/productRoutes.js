const express = require("express");
const { createProduct, getaProduct, updateProduct, getAllProduct, addToWishList, deleteProduct } = require("../conttoller/productConttoller");
const {authMiddleware,isAdmin} = require("../middlewarer/authMiddlewarer");
const upload = require("../middlewarer/upload");
const router = express.Router();

router.post("/",authMiddleware,isAdmin,upload.array("image",10),createProduct);
router.put("/wishlist",authMiddleware,addToWishList)
router.put('/update/:id',updateProduct);
router.get('/:id',getaProduct);
router.get('/',getAllProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct);


module.exports = router;