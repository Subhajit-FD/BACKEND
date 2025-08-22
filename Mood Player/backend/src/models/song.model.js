const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  title: String,
  audio: String,
  mood: String,
});

const song = mongoose.model("song", songSchema);

module.exports = song;
