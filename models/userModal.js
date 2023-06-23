const mongoose = require('mongoose'); 
const bcrypt = require("bcryptjs") 

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fastname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    image:String,
    refreshToken: {
        type: String,
      },
    city:String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
},{
    timestamps:true
});

userSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'wishlist',
    })
  
    next();
  });


// userSchema.pre("save", async (next)=>{
//     const salt = await bcrypt.genSaltSync(10)
//     this.password = await bcrypt.hash(this.password, salt)
// });

// userSchema.method.isPasswordMatched = async (enteredPassword)=>{
//     return await bcrypt.compare(enteredPassword,this.password)
// }


module.exports = mongoose.model('User', userSchema);