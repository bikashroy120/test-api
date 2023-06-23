const express = require("express");
const multer  = require('multer')
const { uploadLinkImg, uploadMulter } = require("../conttoller/uploadContoller");
const upload = multer({ dest: 'uploads' })
const router = express.Router();

// router.post(
//   "/",
//   authMiddleware, 
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImgResize,
//   uploadImages  
// );

// router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

router.post("/link-upload", uploadLinkImg)
router.post("/upload-multer",upload.array('photos', 100),uploadMulter)

module.exports = router;