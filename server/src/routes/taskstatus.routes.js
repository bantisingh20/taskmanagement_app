const router = require('express').Router();
const TaskStatusController = require('../controllers/taskstatus.controller');

router.get('/get-all-taskstatuses', TaskStatusController.getAllTaskStatuses);
router.post('/save-taskstatus', TaskStatusController.createTaskStatus);
router.put('/update-taskstatus/:id', TaskStatusController.updateTaskStatus);
router.get('/get-taskstatus/:id', TaskStatusController.getTaskStatusById);
router.delete('/delete-taskstatus/:id', TaskStatusController.deleteTaskStatus);
router.put('/active-inactive-taskstatus/:id', TaskStatusController.activateDeactivateTaskStatus);

module.exports = router;