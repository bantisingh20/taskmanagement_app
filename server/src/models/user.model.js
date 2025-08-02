// models/user.model.js (Mongoose example)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});

module.exports = mongoose.model('User', userSchema);
