const TaskStatusModel = require('../models/taskstatus.model');

module.exports.getAllTaskStatuses = async (req, res) => {
  try {
    const taskStatuses = await TaskStatusModel.find().where({isDelete: false});
    res.status(200).json({ success: true, message: 'Task statuses fetched successfully', data: taskStatuses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.createTaskStatus = async (req, res) => {
  const taskStatus = new TaskStatusModel(req.body);
  try {
    const savedTaskStatus = await taskStatus.save();
    res.status(201).json({ success: true, message: 'Task status created successfully', data: savedTaskStatus });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.updateTaskStatus = async(req, res) => {
    try {
        const UpdateTaskStatus = await TaskStatusModel.findByIdAndUpdate(req.params.id,req.body,{new : true}).where({isDelete: false});
         if (!UpdateTaskStatus) return res.status(404).json({ success: false, message: 'Task Status not found' });
        res.status(200).json({ success: true, message: 'Task Staus updated successfully', data: UpdateTaskStatus });
    }catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports.getTaskStatusById = async (req, res) => {
  try {
    const taskStatus = await TaskStatusModel.findById(req.params.id).where({isDelete: false});
    if (!taskStatus) return res.status(404).json({ success: false, message: 'Task Status not found' });
    res.status(200).json({ success: true, message: 'Task Status fetched successfully', data: taskStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deleteTaskStatus = async (req, res) => {
  try {
    const taskStatus = await TaskStatusModel.findById(req.params.id).where({isDelete: false});
    if (!taskStatus) return res.status(404).json({ success: false, message: 'Task Status not found' });
    taskStatus.isDelete = true;
    const updatedTaskStatus = await taskStatus.save();
    res.status(200).json({ success: true, message: 'Task Status deleted successfully', data: updatedTaskStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.activateDeactivateTaskStatus = async (req, res) => {
  try {
    const taskStatus = await TaskStatusModel.findById(req.params.id).where({isDelete: false});
    if (!taskStatus) return res.status(404).json({ success: false, message: 'Task Status not found' });
    taskStatus.isActive = !taskStatus.isActive;
    const updatedTaskStatus = await taskStatus.save();
    res.status(200).json({ success: true, message: 'Task Status updated successfully', data: updatedTaskStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
