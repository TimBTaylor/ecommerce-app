const express = require("express");
const router = express.Router();
const getUser = require("../middleware/getUser");
const getProduct = require("../middleware/getProduct");

// add item to savedForLater
router.put("/:id/add-to-saved", getUser, getProduct, async (req, res) => {
  const newItem = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.user.savedForLater.unshift(newItem);
  try {
    await res.user.save();
    return res.status(201).json(res.user.savedForLater);
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
    return res.status(200).json(res.user.savedForLater);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//remove all items for savedForLater
router.delete("/:id/remove-all-from-later", getUser, async (req, res) => {
  try {
    res.user.savedForLater = [];
    await res.user.save();
    return res.status(200).json(res.user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
