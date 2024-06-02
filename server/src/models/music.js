require("../DB/connection");
const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const musicSchema = mongoose.Schema({
  songID: { type: String, default: uuidv4 },
  title: { type: String },
  artist: { type: String },
  album: { type: String },
  genre: { type: String },
  releaseDate: { type: String },
  duration: { type: Number },
  fileUrl: { type: String },
});
musicSchema.statics.music = async function (
  title,
  artist,
  album,
  genre,
  releaseDate,
  duration,
  fileUrl
) {
  try {
    const find = await musicModle.findOne({
      fileUrl: fileUrl,
    });
    if (!find) {
      const main = {
        title: title,
        artist: artist,
        album: album,
        genre: genre,
        releaseDate: releaseDate,
        duration: duration,
        fileUrl: fileUrl,
      };
      return main;
    } else {
      return "";
    }
  } catch (error) {
    throw Error("songs alreay exist");
  }
};
musicSchema.statics.getSongId = async function (songId) {
  console.log(songId);
  const find = await musicModle.findOne({ songID: songId });
  console.log(find);
  if (find) {
    return find;
  } else {
    throw Error("Internal server error");
  }
};
const musicModle = new mongoose.model("music", musicSchema);

module.exports = musicModle;
