//const express = require('express');
const router = require('express').Router();
const priorityController = require('../controllers/priority.controller');

//router.get('/get-all-priorities',authenticate priorityController.getAllPriorities);
router.get('/get-all-priorities', priorityController.getAllPriorities);
router.post('/save-priority', priorityController.createPriority);
router.put('/update-priority/:id', priorityController.UpdatePriority);
router.get('/get-priority/:id', priorityController.getPriorityById);
router.delete('/delete-priority/:id', priorityController.deletePriority);
router.put('/active-inactive-priority/:id', priorityController.activateDeactivatePriority);

module.exports = router;