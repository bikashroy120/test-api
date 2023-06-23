
// Not Found
const notFound = (req,res,next)=>{
    const error = new error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error)
}


const errorHandeler = (err,req,res,next)=>{
    const satatuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(satatuscode);
    res.json({
        message:err?.message,
        stack:err?.stack
    })    
}

module.exports={errorHandeler,notFound}
