require("../DB/connection");

const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  songIds: { type: Array },
});

playlistSchema.statics.playlistadd = async function (
  name,
  description,
  songIds
) {
  const playlistadd = { name: name, description: description, songs: songIds };
  let x = [
    "60b8d5b54b8e4d3f88b6d9b3",
    "60b8d5b54b8e4d3f88b6d9b5",
    "60b8d6a64b8e4d3f88b6d9b4",
  ];
  for (let i = 0; i < x.length; i++) {
    let y = playlistadd.songs.find((items) => items === x[i]);
    let u = x.filter((item) => item !== y);
    console.log("y", y);
    console.log(u);
  }

  return playlistadd;
};

const playlistModel = new mongoose.model("playlist", playlistSchema);

module.exports = playlistModel;
