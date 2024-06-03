require("../DB/connection");
const mongoose = require("mongoose");
const musicModel = require("../models/music");

const favoriteSchema = mongoose.Schema({
  songId: { type: String },
  action: { type: String },
});

favoriteSchema.statics.favoriteSongs = async function (mainsongId, mainaction) {
  //   console.log(mainaction);
  const findSongFavorite = await favoriteModel.findOne({ songId: mainsongId });

  /////

  let findSong = await musicModel.findOne({ songID: mainsongId });
  if (findSong) {
    if (mainaction === "add") {
      if (findSongFavorite) {
        throw Error("song is already added into the favorites");
      }
      const add = await favoriteModel({
        songId: mainsongId,
        action: mainaction,
      });
      add.save();
      if (add) {
        console.log(add);
        return "add";
      } else {
        throw Error("error in adding");
      }
    } else if (mainaction === "remove") {
      const getId = await favoriteModel
        .findOne({ songId: mainsongId })
        .select("_id");

      if (getId) {
        let del = await favoriteModel.findByIdAndDelete({ _id: getId.id });
        console.log(del);

        if (del) {
          return "remove";
        } else {
          throw Error("error in removing");
        }
      } else {
        throw Error("invalid song");
      }
    } else {
      throw Error("invalid action");
    }
  } else {
    throw Error("invalid song");
  }
};
const favoriteModel = new mongoose.model("favorite", favoriteSchema);

module.exports = favoriteModel;
