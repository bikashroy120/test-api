const express = require("express");
const { creactBlog, liketheBlog, disliketheBlog, updateBlog, getBlog, getAllBlog, deleteBlog, uploadImages } = require("../conttoller/blogConttoller");
const router = express.Router();
const {authMiddleware,isAdmin} = require("../middlewarer/authMiddlewarer");
const upload = require("../middlewarer/upload");



router.post("/",authMiddleware,isAdmin,upload.single("image"),creactBlog)
router.put("/likes",authMiddleware,liketheBlog)
router.put("/dislikes",authMiddleware,disliketheBlog)
router.put("/:id",updateBlog)
router.get("/:id",getBlog)
router.get("/",getAllBlog)
router.delete("/:id",deleteBlog)


module.exports=router;