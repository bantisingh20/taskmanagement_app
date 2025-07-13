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
import { CalendarIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const AddTask = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample data for dropdowns
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

  const onSubmit = (data) => {
    console.log('Task submitted:', data);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add Task button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Task
          </button>
        </div>

        {/* Task list table would go here */}

        {/* Right Side Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white h-full w-full max-w-md shadow-xl overflow-y-auto">
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      reset();
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
                  {/* Hidden ID field */}
                  <input type="hidden" {...register("id")} />

                  {/* Task Name */}
                  <div>
                    <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name*
                    </label>
                    <input
                      type="text"
                      id="taskName"
                      {...register("taskName", { required: "Task name is required" })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                        errors.taskName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                      placeholder="Enter task name"
                    />
                    {errors.taskName && (
                      <p className="mt-1 text-sm text-red-600">{errors.taskName.message}</p>
                    )}
                  </div>

                  {/* Task Description */}
                  <div>
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

                  {/* Priority Dropdown */}
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority*
                    </label>
                    <select
                      id="priority"
                      {...register("priority", { required: "Priority is required" })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                        errors.priority ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
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

                  {/* Status Dropdown */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status*
                    </label>
                    <select
                      id="status"
                      {...register("status", { required: "Status is required" })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                        errors.status ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
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

                  {/* Target Date */}
                  <div>
                    <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Target Date*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="targetDate"
                        {...register("targetDate", { required: "Target date is required" })}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                          errors.targetDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                      />
                      <div className="absolute right-3 top-2.5">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.targetDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.targetDate.message}</p>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        reset();
                      }}
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusIcon className="h-5 w-5" />
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

