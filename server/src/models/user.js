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
    unique: [true, "Email id already present"],
  },
  password: {
    type: String,
    require: [true, "please enter password "],
  },
});

userSchema.statics.user = async function (email, password) {
  const userFind = await userModel.findOne({ email });

  if (!userFind) {
    throw Error("email is invalid");
  }
  if (password !== userFind.password) {
    throw Error("Password is incorrect");
  }
  if (userFind) {
    let token = userJWt(userFind._id);

    return { email, password, token };
  }
};

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
