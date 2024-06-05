require("../DB/connection");
const userJWt = require("../utilities/jwt/jwt");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "please enter email id "],
    validator: [isEmail, "Please enter valid email id"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "please enter password "],
  },
});

userSchema.statics.user = async function (email, password) {
  const find = userModel.findOne({ email: email });
  if (find) {
    const token = userJWt(find._id);
    return { token };
  }
  if (!find) {
    const token = userJWt(find._id);
    const add = await userModel.create({ email: email, password: password });
    return { token };
  }
};

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
