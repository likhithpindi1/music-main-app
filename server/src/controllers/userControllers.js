const userModle = require("../models/user");
const auth = require("../middleware/authorization");
const musicModle = require("../models/music");
const playlistModel = require("../models/playlist");

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
  const { title, artist, album, genre, releaseDate, duration, fileUrl } =
    req.body;
  if (req.file) {
    const { file } = req.file;
    console.log(req.file);
  }

  try {
    const music = await musicModle.music(
      title,
      artist,
      album,
      genre,
      releaseDate,
      duration,
      fileUrl
    );
    if (music.title) {
      await musicModle.create({
        title: title,
        artist: artist,
        album: album,
        genre: genre,
        releaseDate: releaseDate,
        duration: duration,
        fileUrl: fileUrl,
      });
      const fileURL = music.fileURL;
      const musicData = await musicModle.findOne({ fileURL });
      const mainSoingid = musicData.songID;
      console.log(musicData);

      res
        .status(201)
        .json({ message: "Song added successfully", songId: mainSoingid });
    } else {
      res.status(201).json({ message: "Song added successfully" });
    }
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

const getSongById = async function (req, res) {
  try {
    const paramsSongId = req.params.songId;
    console.log(paramsSongId);
    const songData = await musicModle.getSongId(paramsSongId);
    res.status(200).json({ songs: songData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const playlist = async function (req, res) {
  const { name, description, songIds } = req.body;
  // console.log(songIds);
  try {
    const playlistsongs = await playlistModel.playlistadd(
      name,
      description,
      songIds
    );
    res.status(201).json({
      message: "Playlist created successfully",
      playlistId: playlistsongs,
    });
  } catch (e) {
    res.status(400).json({ message: "Invalid input data" });
  }
};
module.exports = { user, music, getSongById, playlist };
