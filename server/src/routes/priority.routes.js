//const express = require('express');
const router = require('express').Router();
const priorityController = require('../controllers/priority.controller');

router.get('/get-all-prioritys', priorityController.getAllPriorities);
router.post('/add', priorityController.createPriority);
router.put('/update/:id', priorityController.UpdatePriority);
router.get('/get-priority/:id', priorityController.getPriorityById);
router.delete('/:id', priorityController.deletePriority);
router.patch('/:id/status', priorityController.activateDeactivatePriority);

module.exports = router;