const userModle = require("../models/user");
const auth = require("../middleware/authorization");
const musicModle = require("../models/music");

const user = async function (req, res) {
  const { email, password } = req.body;

  try {
    const { token } = await userModle.user(email, password);
    res.status(200).json({ token: token });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

const music = async function (req, res) {
  const { song } = req.body;
  try {
    const music = await musicModle.music(song);
    res.status(200).json({ song: music });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};
module.exports = { user, music };
