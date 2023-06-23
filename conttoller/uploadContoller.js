const fs = require("fs");
const imageDownloader = require('image-downloader');


// const {
//   cloudinaryUploadImg,
//   cloudinaryDeleteImg,
// } = require("../utails/cloudinary");
// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const uploader = (path) => cloudinaryUploadImg(path, "images");
//     const urls = [];
//     const files = req.files;
//     for (const file of files) { 
//       const { path } = file;
//       const newpath = await uploader(path);
//       console.log(newpath);
//       urls.push(newpath);
//       fs.unlinkSync(path);
//     }
//     const images = urls.map((file) => {
//       return file;
//     });
//     res.json(images);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const deleteImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleted = cloudinaryDeleteImg(id, "images");
//     res.json({ message: "Deleted" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const uploadLinkImg = async(req,res)=>{

  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
      url: link, 
      dest: __dirname + "/../uploads/" + newName,  
  })

  res.json(newName)
}

const uploadMulter = (req,res)=>{
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles);
}

module.exports = {
  uploadLinkImg,
  uploadMulter
};