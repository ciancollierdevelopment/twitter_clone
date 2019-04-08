const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  user: String,
  content: String,
  time: Date
});

module.exports = mongoose.model('post', Post);
