require("../DB/connection");
const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const musicSchema = mongoose.Schema({
  songFile: { data: Buffer, contentType: String },
  songID: { type: String, default: uuidv4 },
  title: { type: String },
  artist: { type: String },
  album: { type: String },
  genre: { type: String },
  releaseDate: { type: String },
  duration: { type: Number },
  fileUrl: { type: String },
});
musicSchema.statics.songs = async function (
  title,
  artist,
  album,
  genre,
  releaseDate,
  duration,
  fileUrl
) {
  const data = {
    title: title,
    artist: artist,
    album: album,
    genre: genre,
    releaseDate: releaseDate,
    duration: duration,
    fileUrl: fileUrl,
  };
  const songFound = await musicModle.findOne({ fileUrl: fileUrl });
  if (songFound) {
    if (songFound.fileUrl === fileUrl) {
      throw Error("song is alreay added");
    }
  }
  if (data) {
    return data;
  }
  if (!data) {
    throw Error("Invalid input data");
  }
};

musicSchema.statics.getSongId = async function (songId) {
  // console.log(songId);
  const find = await musicModle.findOne({ songID: songId });
  // console.log(find);
  if (find) {
    return find;
  } else {
    throw Error("Internal server error");
  }
};
const musicModle = new mongoose.model("music", musicSchema);

module.exports = musicModle;
