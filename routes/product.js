const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const productReviewShema = require("../models/productReview");
const getProduct = require("../middleware/getProduct");

// get all products
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// request for adding product
router.post("/new-product", async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    quantity: req.body.quantity,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get product by id
router.get("/get-product", getProduct, async (req, res) => {
  try {
    res.send(res.product);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

// add review to product
router.post("/product-review", getProduct, async (req, res) => {
  try {
    const newReview = new productReviewShema({
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
      buyAgain: req.body.buyAgain,
    });

    res.product.reviews.push(newReview);

    const updatedReviews = await res.product.save();
    return res.status(200).json(updatedReviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
