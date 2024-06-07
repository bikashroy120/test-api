const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var shippingCostSchema = new mongoose.Schema(
  {
    inDhaka: {
      type: Number,
      required: true,
    },
    outDhaka: {
        type: Number,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("ShippingCost", shippingCostSchema);