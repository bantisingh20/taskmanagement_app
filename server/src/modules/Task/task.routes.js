const express = require('express');
const router = express.Router();
const controller = require('./task.controller');

router.get("/get-task",controller.getAllTask)
router.post("/get-task",controller.Add_Update_Task)

module.exports = router;