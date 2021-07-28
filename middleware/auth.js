//auth middleware

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    jwt.verify(token, "longer-secret-is-better");
    next();
  } catch (error) {
    res.status(401).json({
      message: "cannot authorize token",
    });
  }
};
