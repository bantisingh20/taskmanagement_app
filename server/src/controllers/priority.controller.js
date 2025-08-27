const PriorityModel = require('../models/priority.model');

module.exports.getAllPriorities = async (req, res) => {
  try {
    const priorities = await PriorityModel.find().where({isDelete: false});
    res.status(200).json({ success: true, message: 'Priorities fetched successfully', data: priorities ,pagination: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.createPriority = async (req, res) => {
  const priority = new PriorityModel(req.body);
  try {
    const savedPriority = await priority.save();
    res.status(201).json({ success: true, message: 'Priority created successfully', data: savedPriority });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.UpdatePriority = async(req,res) =>{
    try{
        const updatedPriority = await PriorityModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).where({isDelete: false});
        if (!updatedPriority) return res.status(404).json({ success: false, message: 'Priority not found' });
        res.status(200).json({ success: true, message: 'Priority updated successfully', data: updatedPriority });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports.getPriorityById = async (req, res) => {
  try {
    const priority = await PriorityModel.findById(req.params.id).where({isDelete: false});
    if (!priority) return res.status(404).json({ success: false, message: 'Priority not found' });
    res.status(200).json({ success: true, message: 'Priority fetched successfully', data: priority });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deletePriority = async (req, res) => {
  try {
    const priority = await PriorityModel.findById(req.params.id).where({isDelete: false});
    if (!priority) return res.status(404).json({ success: false, message: 'Priority not found' });
    priority.isDelete = !priority.isDelete;
    const updatedPriority = await priority.save();
    res.status(200).json({ success: true, message: 'Priority deleted successfully', data: updatedPriority });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.activateDeactivatePriority = async (req, res) => {
  try {
    const priority = await PriorityModel.findById(req.params.id).where({isDelete: false});
    if (!priority) return res.status(404).json({ success: false, message: 'Priority not found' });
    priority.isActive = !priority.isActive;
    const updatedPriority = await priority.save();
    res.status(200).json({ success: true, message: 'Priority status updated successfully', data: updatedPriority });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}