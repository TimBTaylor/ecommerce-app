const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// get all products
router.get("/allproducts", async (req, res) => {
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
    reviews: req.body.reviews,
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
router.get("/product-by-id/:id", getProduct, async (req, res) => {
  try {
    res.send(res.product);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

// add review to product
router.post("/:id/review", getProduct, async (req, res) => {
  try {
    if (req.body !== null) {
      res.product.reviews.push(req.body);
    }

    const updatedReviews = await res.product.save();
    return res.status(200).json(updatedReviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//get product middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);

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
