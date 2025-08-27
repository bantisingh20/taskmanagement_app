// services/priority.service.js
// in this file create or add all service with is relted to priority so that 
// if any file i need that i can import it from here

const PriorityModel = require('../models/priority.model');

export const createPriority = async (data) => {
  const priority = new PriorityModel(data);
  return await priority.save();
};

export const getAllPriorities = async () => {
  return await PriorityModel.find();
};

export const getPriorityById = async (id) => {
  return await PriorityModel.findById(id);
};

export const updatePriority = async (id, data) => {
  return await PriorityModel.findByIdAndUpdate(id, data, { new: true });
};

export const deletePriority = async (id) => {
  return await PriorityModel.findByIdAndDelete(id);
};

