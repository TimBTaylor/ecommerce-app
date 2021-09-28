const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cardSchema", cardSchema);
