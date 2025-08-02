// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSubmitHook } from "../hooks/useSubmithook";

// const AddTask = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const { loading, error, successMessage, submitData } = useSubmitHook("tasks");

//   const onSubmit = async (formData) => { 
//     await submitData(formData);
//   };

//   return (
//     <div className="w-full max-w-full bg-white rounded-lg shadow-md border border-sky-100 p-4 md:p-6">
//       <h2 className="text-xl md:text-2xl font-semibold text-sky-700 mb-4 text-center">
//         Add Task
//       </h2>

//       <form className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" onSubmit={handleSubmit(onSubmit)}>

//         <div className="md:col-span-2">
//           <label className="block text-gray-700 mb-1">Task Name</label>
//           <input
//             type="text"
//             placeholder="Enter task title"
//             {...register("taskname", { required: "Task Name is required" })}
//             className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
//           />
//           {errors.taskname && <p>{errors.taskname.message}</p>}
//         </div>

//          <div className="md:col-span-2">
//           <label className="block text-gray-700 mb-1">Description</label>
//           <textarea
//             rows="3"
//             placeholder="Task details..."
//             {...register("taskdescription", { required: "Task Description is required" })}
//             className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400 resize-none"
//           ></textarea>
//           {errors.taskdescription && <p>{errors.taskdescription.message}</p>}
//         </div>

//          <div>
//           <label className="block text-gray-700 mb-1">Target Date</label>
//           <input
//             type="date"
//             {...register("targetdate", {
//               required: "Date is required",
//               validate: {
//                 futureDate: (value) => {
//                   const today = new Date();
//                   const selectedDate = new Date(value);
//                   if (selectedDate < today) {
//                     return "Date must be in the future";
//                   }
//                   return true;
//                 },
//               },
//             })}
//             className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
//           />
//           {errors.targetdate && <p>{errors.targetdate.message}</p>}
//         </div>


//         <div>
//           <label className="block text-gray-700 mb-1">Priority</label>
//           <select
//             {...register("priority", { required: "Please select an option" })}
//             className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
//           >
//             <option value="">Select</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//           {errors.priority && <p>{errors.priority.message}</p>}
//         </div>


//         <div className="md:col-span-2">
//           <label className="block text-gray-700 mb-1">Status</label>
//           <select
//             {...register("status", { required: "Please select an option" })}
//             className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
//           >
//             <option value="">Select</option>
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//           {errors.status && <p>{errors.status.message}</p>}
//         </div>


//         <div className="md:col-span-2 mt-1">
//           <button
//             type="submit"
//             className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition text-sm"
//           >
//             Add Task
//           </button>
//         </div>
//       </form>


//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//     </div>
//   );
// };

// export default AddTask;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export const AddTask = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState([
    { id: 1, name: 'To Do', color: 'bg-gray-500', status: 'Active' },
    { id: 2, name: 'In Progress', color: 'bg-blue-500', status: 'Active' },
    { id: 3, name: 'Blocked', color: 'bg-red-500', status: 'Inactive' },
    { id: 4, name: 'Completed', color: 'bg-green-500', status: 'Active' }
  ]);
  const [currentStatus, setCurrentStatus] = useState(null);

  const onSubmit = (data) => {
    if (currentStatus) {
      // Update existing status
      setTaskStatuses(taskStatuses.map(s =>
        s.id === currentStatus.id ? {
          ...s,
          name: data.name,
          color: data.color
        } : s
      ));
    } else {
      // Add new status
      const newStatus = {
        id: taskStatuses.length + 1,
        name: data.name,
        color: data.color,
        status: 'Active'
      };
      setTaskStatuses([...taskStatuses, newStatus]);
    }
    closeModal();
  };

  const changeStatus = (id) => {
    setTaskStatuses(taskStatuses.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ));
  };

  const deleteStatus = (id) => {
    setTaskStatuses(taskStatuses.filter(s => s.id !== id));
  };

  const openModal = (status = null) => {
    setCurrentStatus(status);
    setIsModalOpen(true);
    if (status) {
      reset({ name: status.name, color: status.color });
    } else {
      reset();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStatus(null);
    reset();
  };

  return (
 <>
 <div className="min-h-screen bg-gray-50 p-4 md:p-8">
  <div className="max-w-6xl mx-auto">
    <div className="flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isModalOpen ? 'mr-80' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Status</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sr No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taskStatuses.map((status, index) => (
                <tr key={status.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {status.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-6 h-6 rounded-full ${status.color}`}></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                         ${status.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {status.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => editStatus(status)}
                        className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteStatus(status.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => changeStatus(status.id)}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
                        title={status.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {status.status === 'Active' ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side Modal */}
      {isModalOpen && (
        <div className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 transition-all duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {currentStatus ? 'Edit Status' : 'Add Status'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
              <div className="mb-4">
                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Name*
                </label>
                <input
                  type="text"
                  id="taskName"
                  {...register("taskName", { required: "Task name is required" })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.taskName ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  placeholder="Enter task name"
                />
                {errors.taskName && (
                  <p className="mt-1 text-sm text-red-600">{errors.taskName.message}</p>
                )}
              </div>

              <div className='mb-4'>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter task description"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority*
                </label>
                <select
                  id="priority"
                  {...register("priority", { required: "Priority is required" })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.priority ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                >
                  <option value="">Select priority</option>
                  {priorityOptions.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status*
                </label>
                <select
                  id="status"
                  {...register("status", { required: "Status is required" })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.status ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                >
                  <option value="">Select status</option>
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="targetDate"
                    {...register("targetDate", { required: "Target date is required" })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.targetDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  <div className="absolute right-3 top-2.5">
                  </div>
                </div>
                {errors.targetDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.targetDate.message}</p>
                )}
              </div>

              {currentStatus && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                         ${currentStatus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {currentStatus.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeStatus(currentStatus.id)}
                      className="ml-3 px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-auto space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {currentStatus ? 'Update' : 'Save'} Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

</>
  );
};



const priorityOptions = [
  { id: 1, name: 'High', color: 'bg-red-500' },
  { id: 2, name: 'Medium', color: 'bg-yellow-500' },
  { id: 3, name: 'Low', color: 'bg-green-500' }
];

const statusOptions = [
  { id: 1, name: 'To Do', color: 'bg-gray-500' },
  { id: 2, name: 'In Progress', color: 'bg-blue-500' },
  { id: 3, name: 'Completed', color: 'bg-green-500' }
];
