import React, { useState } from 'react';

const initialTasks = [
  {
    id: 1,
    title: 'Fix login bug',
    status: 'Pending',
    severity: 'High',
    dueDate: '2025-07-15',
  },
  {
    id: 2,
    title: 'Add dark mode',
    status: 'In Progress',
    severity: 'Medium',
    dueDate: '2025-07-20',
  },
  {
    id: 3,
    title: 'Optimize dashboard',
    status: 'Completed',
    severity: 'Low',
    dueDate: '2025-07-10',
  },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  const handleChange = (id, key, value) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, [key]: value } : task
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-sky-700 mb-4">My Tasks</h2>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <label key={status} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="status"
              value={status}
              checked={filter === status}
              onChange={() => setFilter(status)}
              className="accent-sky-600"
            />
            {status}
          </label>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 shadow rounded-lg border border-sky-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>

            {/* Status */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500">Status</label>
              {editingId === task.id ? (
                <select
                  value={task.status}
                  onChange={(e) => handleChange(task.id, 'status', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-sky-400"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              ) : (
                <p className="text-sm mt-1 text-gray-700">{task.status}</p>
              )}
            </div>

            {/* Severity */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500">Severity</label>
              {editingId === task.id ? (
                <select
                  value={task.severity}
                  onChange={(e) => handleChange(task.id, 'severity', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-sky-400"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              ) : (
                <p className="text-sm mt-1 text-gray-700">{task.severity}</p>
              )}
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500">Due Date</label>
              {editingId === task.id ? (
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => handleChange(task.id, 'dueDate', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-sky-400"
                />
              ) : (
                <p className="text-sm mt-1 text-gray-700">{task.dueDate}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              {editingId === task.id ? (
                <button
                  onClick={() => setEditingId(null)}
                  className="text-sky-600 text-sm hover:underline"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setEditingId(task.id)}
                  className="text-sky-600 text-sm hover:underline"
                >
                  Edit Inline
                </button>
              )}
              <a
                href={`/tasks/${task.id}`}
                className="text-sm text-gray-500 hover:text-sky-600"
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
