const router = require('express').Router();
const TaskStatusController = require('../controllers/taskstatus.controller');

router.get('/get', TaskStatusController.getAllTaskStatuses);
router.post('/add', TaskStatusController.createTaskStatus);
router.put('/update/:id', TaskStatusController.updateTaskStatus);
router.get('/get-status/:id', TaskStatusController.getTaskStatusById);
router.delete('/:id', TaskStatusController.deleteTaskStatus);
router.patch('/:id/status', TaskStatusController.activateDeactivateTaskStatus);

module.exports = router;