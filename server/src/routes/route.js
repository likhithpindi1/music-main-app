const express = require("express");
const userAuth = require("../middleware/authorization");
const route = express.Router();
const { user, music } = require("../controllers/userControllers");

route.use(express.json());

route.post("/auth/login", user);
route.use(userAuth);
route.post("/songs", music);

module.exports = route;
