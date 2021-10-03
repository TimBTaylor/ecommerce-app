//auth middleware

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const userToken = jwt.sign(
    {
      email: req.body.email,
      userId: req.params.id,
    },
    "longer-secret-is-better",
    {
      expiresIn: "2h",
    }
  );
  try {
    const token = req.header("auth-token");
    jwt.verify(token, userToken);
    next();
  } catch (error) {
    res.status(401).json({
      message: "cannot authorize token",
    });
  }
};
