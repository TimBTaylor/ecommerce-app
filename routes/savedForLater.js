const express = require("express");
const router = express.Router();
const getUser = require("../middleware/getUser");
const getProduct = require("../middleware/getProduct");

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

module.exports = router;
