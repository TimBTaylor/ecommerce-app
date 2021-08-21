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
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    gender: {
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
    },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", productSchema);
