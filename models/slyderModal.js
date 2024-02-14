const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var slyerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Slyer", slyerSchema);
