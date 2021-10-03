const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const getUser = require("../middleware/getUser");

//updated user
router.post("/:id/update-user", getUser, async (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedRecord) => {
    if (!error) {
      return res.status(200).json(deletedRecord);
    } else {
      return res.status(400).json(error);
    }
  });
  try {
    const users = await User.find();
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        orders: req.body.orders,
        cardInfo: req.body.cardInfo,
        savedForLater: req.body.wishlist,
        cart: req.body.cart,
      });
      const emailUsed = users.filter((user) => {
        return user.email === req.body.email;
      });

      if (emailUsed.length > 0) {
        res.send("Email already in use");
      } else {
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: "user created",
              user: response,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete user
router.delete("/:id/delete-user", getUser, async (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedRecord) => {
    if (!error) {
      return res.status(200).json(deletedRecord);
    } else {
      return res.status(400).json(error);
    }
  });
});

module.exports = router;
