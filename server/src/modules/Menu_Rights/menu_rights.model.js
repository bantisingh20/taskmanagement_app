const mongoose = require('mongoose');

const RightSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, // or userId
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },

  canView: { type: Boolean, default: false },
  canAdd: { type: Boolean, default: false },
  canEdit: { type: Boolean, default: false },
  canDelete: { type: Boolean, default: false },

  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },

  createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  createDate: { type: Date, default: Date.now },
  modifyBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  modifyDate: { type: Date }
});

module.exports = mongoose.model('Right', RightSchema);
