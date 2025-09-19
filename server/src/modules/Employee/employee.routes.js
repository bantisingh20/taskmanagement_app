const express = require('express');
const router = express.Router();
const controller = require('./employee.controller');

router.get("/get-all-employees",controller.getAllEmployees);
router.post("/register", controller.AddOrUpdateEmployee);

module.exports = router;