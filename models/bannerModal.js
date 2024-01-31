const mongoose = require("mongoose");

var bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    category: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
