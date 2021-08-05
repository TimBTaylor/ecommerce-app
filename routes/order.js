const express = require("express");
const router = express.Router();
const orderSchema = require("../models/order");
const getUser = require("../middleware/getUser");
const Product = require("../models/products");

// add order request
router.post("/:id/new-order", getUser, async (req, res) => {
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
router.delete("/:id/delete-order", getUser, async (req, res) => {
  const deleteOrder = req.body.orderId;
  const currentOrderList = res.user.orders;
  const newOrderList = currentOrderList.filter((order) => {
    return order._id != deleteOrder;
  });

  res.user.orders = newOrderList;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update an order
router.put("/:id/update-order", getUser, async (req, res) => {
  const updatedOrderById = req.body.orderId;
  const removedProduct = req.body.productId;
  const currentOrderList = res.user.orders;
  // getting the order that is being updated
  const updatedOrder = currentOrderList.filter((order) => {
    return order._id == updatedOrderById;
  });

  // removing the updated order
  const orderListWithoutUpdatedOrder = currentOrderList.filter((order) => {
    return order._id != updatedOrderById;
  });

  // removing the product from the udpated order
  const updatedProductList = updatedOrder[0].products.filter((product) => {
    return product.id != removedProduct;
  });

  // setting the updated product list
  updatedOrder[0].products = updatedProductList;
  // sets users orders to updated order
  res.user.orders = updatedOrder;
  // loops through rest of orders adding them to the array
  for (let i = 0; i < orderListWithoutUpdatedOrder.length; i++) {
    res.user.orders.push(orderListWithoutUpdatedOrder[i]);
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
