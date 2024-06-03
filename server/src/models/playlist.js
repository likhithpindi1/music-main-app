require("../DB/connection");
const musicModle = require("../models/music");
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
  let find = await playlistModel.findOne({ name: name });
  if (find) {
    throw Error("name already taken");
  }

  const playlistadd = { name: name, description: description, songs: songIds };
  let addedSongs = [];

  for (let i = 0; i < playlistadd.songs.length; i++) {
    let findSong = await musicModle
      .findOne({
        songID: playlistadd.songs[i],
      })
      .select("songID");
    if (findSong) {
      addedSongs.push(findSong.songID);
    }
  }
  let notAddedSongs = playlistadd.songs.filter(
    (item) => !addedSongs.includes(item)
  );
  if (addedSongs.length === 0) {
    throw Error("Invalid input data");
  }

  return {
    PLname: playlistadd.name,
    PLdescription: playlistadd.description,
    addedSongs: addedSongs,
    notAddedSongs: notAddedSongs,
  };
};

const playlistModel = new mongoose.model("playlist", playlistSchema);

module.exports = playlistModel;
