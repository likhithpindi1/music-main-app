const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userAuthorization = async function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw Error("Not Authorize");
  }
  try {
    if (authorization) {
      let token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, "jwt-token");

      req.user = await userModel.find({ _id }).select("_id");

      next();
    }
  } catch (e) {
    res.status(401).json({ message: "not Authorize" });
  }
};
module.exports = userAuthorization;
