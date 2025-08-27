const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "TaskStatus" },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority"},
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  dueDate: { type: Date },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", taskschema);
