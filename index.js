const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const path = require("path")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require('./routes/blogRoutes');
const productCatRoutes = require("./routes/productCatRoutes");
const colorRoutes = require("./routes/colorRoutes");
const brandRoutes = require("./routes/brandRoutes");
const blogCatRoutes = require("./routes/blogCatRoutes");
const couponRoutes = require("./routes/couponRouters");
const bannerRoutes = require("./routes/bannerRoutes")
const cartRoutes = require("./routes/cartRoutes")
const uploadImage = require("./routes/uploadRoute");
const ErrorMiddleware = require("./middlewarer/error");
dbConnect()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"uploads")))
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cookieParser())
app.use(morgan('dev'))

app.get("/",(req,res)=>{
    res.send("Hellow routs")
})
app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/product-category",productCatRoutes);
app.use("/api/color",colorRoutes);    
app.use("/api/brand",brandRoutes);
app.use("/api/blog-category",blogCatRoutes)
app.use("/api/coupon",couponRoutes)
app.use("/api/banner",bannerRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/upload",uploadImage) 


// testing api
app.get("/test",(req,res,next)=>{
    res.status(200).json({
        message:"this is test route",
        success:true
    })
})


// unnone route
app.all("*",(req,res,next)=>{
    const err = new Error("Route not valied !")
    err.statusCode = 404;
    next(err)
})

app.use(ErrorMiddleware)



app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})
