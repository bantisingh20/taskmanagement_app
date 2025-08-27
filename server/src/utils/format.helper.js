// helpers/format.helper.js
exports.formatUserName = (user) => `${user.firstName} ${user.lastName}`;
exports.formatDate = (date) => date.toISOString().split('T')[0];
exports.formatPriority = (priority) => `${priority.name} (${priority.level})`;
exports.formatTask = (task) => `${task.title} - Due: ${task.dueDate}`;
