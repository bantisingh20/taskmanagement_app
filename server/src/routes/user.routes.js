// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../validators/user.validator');

router.get('/:id', validate.getUserById, userController.getUserById);

module.exports = router;
