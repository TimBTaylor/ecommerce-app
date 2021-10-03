const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const getUser = require("../middleware/getUser");

//updated user
router.post("/:id/update-user", getUser, async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then((hashed) => {
      res.user.firstName = req.body.firstName;
      res.user.lastName = req.body.lastName;
      res.user.email = req.body.email;
      res.user.password = hashed;
    });
    await res.user.save();
    return res.status(201).json(res.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete user
router.delete("/:id/delete-user", getUser, async (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedRecord) => {
    if (!error) {
      return res.staus(200).json(deletedRecord);
    } else {
      return res.status(400).json(error);
    }
  });
});

module.exports = router;
