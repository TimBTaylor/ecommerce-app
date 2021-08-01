const express = require("express");
const router = express.Router();
const User = require("../models/users");
const orderSchema = require("../models/order");
const cardSchema = require("../models/card");

// add order request
router.post("/:id/neworder", getUser, async (req, res) => {
  try {
    if (req.body != null) {
      const newOrder = new orderSchema({
        products: req.body.products,
        total: req.body.total,
        quantity: req.body.quantity,
        orderNumber: req.body.orderNumber,
      });
      res.user.orders.push(newOrder);
    }
    const updatedUserOrders = await res.user.save();
    return res.status(200).json(updatedUserOrders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//delete order request
router.delete("/:id/deleteorder/:orderId", getUser, async (req, res) => {
  const deleteOrder = req.params.id;
  const currentOrderList = res.user.orders;
  const newOrderList = currentOrderList.filter((order) => {
    return order._id != deleteOrder;
  });

  res.user.orders = newOrderList;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
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

module.exports = router;
