const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "TaskStatus" },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority"},
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  dueDate: { type: Date },
  createBy: {type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  createDate: { type: Date, default: Date.now },
  modifyBy: {type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  modifyDate: { type: Date },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", Schema);
