const userModle = require("../models/user");
const auth = require("../middleware/authorization");
const musicModle = require("../models/music");
const playlistModel = require("../models/playlist");
const favoriteModel = require("../models/favorite");
const fs = require("fs");
const path = require("path");

const user = async function (req, res) {
  const { email, password } = req.body;

  try {
    const { token } = await userModle.user(email, password);

    res.status(200).json({ token });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

const music = async function (req, res) {
  const { title, artist, album, genre, releaseDate, duration, fileUrl } =
    req.body;
  const file = req.file;
  // console.log(file.path);
  // console.log(file);
  try {
    const musicData = await musicModle.songs(
      title,
      artist,
      album,
      genre,
      releaseDate,
      duration,
      fileUrl
    );
    const x = await musicModle.create({
      title: title,
      artist: artist,
      album: album,
      genre: genre,
      releaseDate: releaseDate,
      duration: duration,
      fileUrl: fileUrl,
      songFile: { data: fs.readFileSync(file.path), contentType: "mp3" },
    });
    // console.log(x.songFile);
    const songId = await musicModle.findOne({ fileUrl: fileUrl });
    const mainsongID = songId.songID;
    res.status(201).json({
      message: "Song added successfully",
      songId: mainsongID,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getSongById = async function (req, res) {
  try {
    const paramsSongId = req.params.songId;
    // console.log(paramsSongId);
    const songData = await musicModle.getSongId(paramsSongId);
    // console.log(songData);
    const x = songData.title;
    res.status(200).json({ songs: songData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const playlist = async function (req, res) {
  const { name, description, songIds } = req.body;
  // console.log(songIds);
  try {
    const { PLname, PLdescription, addedSongs, notAddedSongs } =
      await playlistModel.playlistadd(name, description, songIds);

    await playlistModel.create({
      name: PLname,
      description: PLdescription,
      songIds: addedSongs,
    });

    let findPLID = await playlistModel.findOne({ name: name }).select("_id");

    res.status(201).json({
      message: "Playlist created successfully",
      playlistId: findPLID,
      error_to_add: notAddedSongs,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const favoriteSongs = async function (req, res) {
  const { songId, action } = req.body;
  try {
    const favoriteSongId = await favoriteModel.favoriteSongs(songId, action);

    if (favoriteSongId === "add") {
      res.status(200).json({ message: "Song added to favorites" });
    }
    if (favoriteSongId === "remove") {
      res.status(200).json({ message: "Song removed from favorites" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = { user, music, getSongById, playlist, favoriteSongs };
