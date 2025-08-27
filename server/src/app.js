const express = require('express');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
//app.use(bodyParser.json());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

module.exports = app;