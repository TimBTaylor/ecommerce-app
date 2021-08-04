const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const User = require("../models/users");

// add item to savedForLater
router.put("/:id/add-to-saved", getUser, getProduct, async (req, res) => {
  const newItem = {
    _id: res.product._id,
    name: res.product.title,
    price: res.product.price,
    category: res.product.category,
    image: res.product.image,
  };
  res.user.savedForLater.unshift(newItem);
  try {
    await res.user.save();
    return res.json(res.user.savedForLater);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// remove item from saved
router.delete("/:id/delete-from-saved", getUser, async (req, res) => {
  const productId = req.body.productId;
  const usersSavedForLater = res.user.savedForLater;
  const savedForLater = usersSavedForLater.filter((product) => {
    return product._id != productId;
  });

  res.user.savedForLater = savedForLater;

  try {
    await res.user.save();
    return res.json(res.user.savedForLater);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//get user middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

//get product middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);

    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}
module.exports = router;
