const express = require("express");
const userAuth = require("../middleware/authorization");
const route = express.Router();
const {
  user,
  music,
  getSongById,
  playlist,
  favoriteSongs,
} = require("../controllers/userControllers");
const upload = require("../middleware/multer");
path = require("path");
const songPath = path.join(__dirname, "../utilities/upload");
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use("/play", express.static(songPath));
route.post("/auth/login", user);
route.use(userAuth);

route.post("/songs", upload.single("file"), music);
route.get("/songs/:songId", getSongById);
route.post("/playlists", playlist);
route.post("/favorites", favoriteSongs);

module.exports = route;
