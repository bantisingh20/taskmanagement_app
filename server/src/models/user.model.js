// models/user.model.js (Mongoose example)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
