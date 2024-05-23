const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => {
    console.log("conected");
  })
  .catch((e) => console.log("error"));
