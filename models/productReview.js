const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buyAgain: {
      type: String,
      required: true,
    },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("productReviewSchema", productReviewSchema);
