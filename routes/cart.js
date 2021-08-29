const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const getUser = require("../middleware/getUser");
const getProduct = require("../middleware/getProduct");

// add item to cart
router.put("/:id/add-to-cart", getUser, getProduct, async (req, res) => {
  const newItem = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.user.cart.unshift(newItem);
  try {
    await res.user.save();
    return res.status(201).json(res.user.cart);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//remove item from cart
router.delete("/:id/delete-from-cart", getUser, async (req, res) => {
  const productId = req.body.productId;
  const usersCart = res.user.cart;
  const cart = usersCart.filter((product) => {
    return product !== productId;
  });
  res.user.cart = cart;

  try {
    await res.user.save();
    return res.status(200).json(res.user.cart);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//remove all items from cart
router.delete("/:id/remove-all-from-cart", getUser, async (req, res) => {
  try {
    res.user.cart = [];
    await res.user.save();
    return res.status(200).json(res.user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
