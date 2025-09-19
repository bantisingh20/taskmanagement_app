const TaskModel = require('./task.model');
const httpStatus = require('../../constants/httpStatus');

exports.getAllTask = async (req, res) => {
  try {
    const priorities = await TaskModel.find().where({ isDelete: false });
    const total = 0;//await PriorityModel.countDocuments().where({isDelete: false});
    console.log(priorities);
    res.status(200).json(httpStatus.success(priorities, { total }, 'Task Fetch Successfully'));
  } catch (error) {
    res.status(500).json(httpStatus.error(error.message, 500));
  }
};

exports.Add_Update_Task = async (req, res) => {
  const { _id, ...taskData } = req.body;

  try {
    if (_id && _id !== '0' && _id !== 0 && _id !== '') {
      // Update existing task
      const updatedTask = await TaskModel.findByIdAndUpdate(_id, taskData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTask) {
        return res.status(404).json(httpStatus.error('Task not found', 404));
      }

      return res.status(200).json(httpStatus.success(updatedTask, null, 'Task Updated Successfully'));
    } else {

      const task = new TaskModel(taskData);
      const savedTask = await task.save();

      return res
        .status(201)
        .json(httpStatus.success(savedTask, null, 'Task Created Successfully'));
    }
  } catch (error) {
    return res.status(500).json(httpStatus.error(error.message, 500));
  }
};

exports.DeleteTask = async (req, res) => {
  
}