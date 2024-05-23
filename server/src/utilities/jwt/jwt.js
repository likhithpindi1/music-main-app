const jwt = require("jsonwebtoken");
const userJWT = function (id) {
  return jwt.sign({ id }, "jwt-token", { expiresIn: "3d" });
};

module.exports = userJWT;
