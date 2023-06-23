const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    
    products: Array,
    orderStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Processing",
        "Complete",
      ],
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    FirstName: {
        type:String
    },
    LastName: {
        type:String
    },
    email: {
        type:String
    },
    phone: {
        type:String
    },
    address: {
        type:String
    },
    city: {
        type:String
    },
    country: {
        type:String
    },
    zip: {
        type:String
    },
    shipping: {
        type:String
    },
    method: {
        type:String
    },
    totle: {
        type:Number
    },
    discount:{
        type:Number
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);