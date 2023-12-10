const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "Unauthorised access" });
  }
  try {
    const decode = jwt.verify(token, process.env.Secret_key);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorised" });
  }
};
module.exports = requireAuth;
