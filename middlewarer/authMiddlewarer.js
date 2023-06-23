const User  = require("../models/userModal")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRIT);
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      } catch (error) {
        res.status(401).json(error)
      }
    } else {
      res.status(401).json({message:"There is no token attached to header"});
    }
  });

const isAdmin = asyncHandler(async (req,res,next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});

    if(adminUser.role !== "admin"){
        throw new Error("You are not an admin")
    }else{
        next()
    }
})


module.exports = {authMiddleware,isAdmin};