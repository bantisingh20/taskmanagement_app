import React, { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
 

const Dashboard = () => {
 
  const stats = [
    { label: 'Total Tasks', value: 42, icon: ClipboardDocumentListIcon },
    { label: 'In Progress', value: 8, icon: PlusCircleIcon },
    { label: 'Completed', value: 30, icon: CheckCircleIcon },
    { label: 'Overdue', value: 4, icon: Cog6ToothIcon },
  ];

  const tasks = [
    {
      title: 'Design login page',
      due: '2025-07-15',
      status: 'In Progress',
      priority: 'High',
    },
    {
      title: 'Fix bug in task view',
      due: '2025-07-12',
      status: 'Completed',
      priority: 'Medium',
    },
    {
      title: 'Create dashboard stats',
      due: '2025-07-13',
      status: 'Pending',
      priority: 'High',
    },
  ];

  return (
    <div>
      {/*  className="min-h-screen flex bg-sky-50" */}

      <h1 className="text-2xl font-bold text-primary mb-4">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-sky-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-600">{stat.label}</h2>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-primary" />
            </div>
          </div>
        ))}
      </div>


      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow border border-sky-100 mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Task Completion Rate</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-primary h-4 rounded-full" style={{ width: '72%' }}></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">72% completed</p>
      </div>

      {/* Recent Tasks Table */}
      <div className="bg-white p-4 rounded-lg shadow border border-sky-100">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Tasks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 pr-4">Task</th>
                <th className="py-2 pr-4">Due Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Priority</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {tasks.map((task, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2 pr-4">{task.title}</td>
                  <td className="py-2 pr-4">{task.due}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                      }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-600' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                      }`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
