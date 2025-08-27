const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hireDate: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  modifyDate: { type: Date },
  modifyBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('Employee', employeeSchema);
