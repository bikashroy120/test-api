const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    bprice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"PCategory"
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Brand"
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [String],
    color: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Color"
      }
    ],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);


productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'color',
  }).populate({
    path: 'brand',
  }).populate({
    path: 'category',
  });

  next();
});

//Export the model
module.exports = mongoose.model("Product", productSchema);