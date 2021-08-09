const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/auth");

//login request

router.post("/login", async (req, res) => {
  let getUser;
  // finds user via email
  await User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Login Failed at email",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Login Failed at password",
        });
      }
    })
    .then(() => {
      let jwToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser.id,
        },
        "longer-secret-is-better",
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({
        token: jwToken,
        expiresIn: 600,
        user: getUser,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: err.message,
      });
    });
});

// register request

router.post("/register", async (req, res) => {
  const users = await User.find();
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
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
});

// all users request
router.get("/allusers", authorize, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
