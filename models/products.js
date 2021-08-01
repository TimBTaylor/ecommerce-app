const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", productSchema);
