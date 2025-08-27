const mongoose = require("mongoose");

const priorityScehma = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },

});

module.exports = mongoose.model("Priority", priorityScehma);
