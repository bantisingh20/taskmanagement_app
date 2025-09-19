// services/user.service.js
const UserModel = require('../models/user.model');

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};
