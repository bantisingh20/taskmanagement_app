const fs = require('fs');
const path = require('path');

const structure = [
  "src/config/",
  "src/controllers/",
  "src/routes/",
  "src/models/",
  "src/services/",
  "src/middlewares/",
  "src/validators/",
  "src/helpers/",
  "src/utils/",
  "src/constants/",
  "src/db/",
  "src/logs/"
];

const files = {
  "src/app.js": `
const express = require('express');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

module.exports = app;
`,
  "src/server.js": `
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
});
`,
  ".env": "PORT=5000\nMONGO_URI=mongodb://localhost:27017/taskdb",
  ".gitignore": "node_modules/\n.env",
  "README.md": "# Task Management API\n\nNode.js Express-based task management API using best practices.",
  "package.json": `
{
  "name": "task-management-api",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.3.1",
    "dotenv": "^16.3.1",
    "joi": "^17.9.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
`
};

// Create folders
structure.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Write files
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filePath), content.trim());
}

console.log("✅ Project structure created successfully!");
