require("../DB/connection");
const mongoose = require("mongoose");
const musicSchema = mongoose.Schema({
  song: { type: String },
});
musicSchema.statics.music = async function (song) {
  const main = song;
  return main;
};

const musicModle = new mongoose.model("music", musicSchema);

module.exports = musicModle;
