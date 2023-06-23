const  mongoose  = require("mongoose")


const dbConnect = ()=>{
    try {
        mongoose.set('strictQuery', true)
        const conn = mongoose.connect(process.env.DB_UTL)
        console.log("Database connect")
    } catch (error) {
        console.log("Database error") 
    }
}

module.exports = dbConnect