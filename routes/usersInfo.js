const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const User = require("../models/users");
const bcrypt = require("bcrypt");

//updated user
router.post("/:id/update-user", authorize, getUser, async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then((hashed) => {
      res.user.name = req.body.name;
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
router.delete("/:id/delete-user", authorize, getUser, async (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedRecord) => {
    if (!error) {
      res.json(deletedRecord);
    } else {
      res.json(error);
    }
  });
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
