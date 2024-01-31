const mongoose = require("mongoose");


var couponSchema = new mongoose.Schema({
  title:{
    type:String
  },
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  image:{
    type:String
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Coupon", couponSchema);