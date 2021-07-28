const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/auth");

//login
router.post("/login", (req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
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
        message: "Auth failed here",
      });
    });
});

//register user
router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
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
          error,
        });
      });
  });
});

//get all users
router.route("/getusers").get(authorize, (req, res) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error);
    }
    res.status(200).json(response);
  });
});

module.exports = router;
