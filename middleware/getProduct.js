const Product = require("../models/products");

//get product middleware

module.exports = async (req, res, next) => {
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
};
