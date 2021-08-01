const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("orderSchema", orderSchema);
