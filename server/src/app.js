const express = require('express');
const indexRoutes = require('./routes/index.routes');
const errorHandler = require('./middlewares/error.middleware');
const cors = require('cors');

const app = express();
//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api', indexRoutes);
app.use(errorHandler);

module.exports = app;