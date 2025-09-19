import React, { useState } from "react";
import { useForm } from "react-hook-form";
 
export const AddTask = ({ onSubmit, defaultValues, isModal = false }) => {

  const [priorityOptions,setpriorityOptions] = useState([]);
  const [statusOptions,setstatusOptions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      id: 1,
      taskName: "",
      priority: "bg-gray-500",
      taskstatus: "Open",
      targetDate: "",
      status: "Active",
    },
  });

  return (
    <div
      className={`${
        isModal ? "max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg" : "max-w-3xl mx-auto p-8"
      } w-full min-h-screen flex flex-col justify-center`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Name */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="taskName">
            Task Name
          </label>
          <input
            id="taskName"
            {...register("taskName", { required: "Task Name is required" })}
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.taskName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter task name"
          />
          {errors.taskName && (
            <p className="text-red-500 text-sm mt-1">{errors.taskName.message}</p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
          >
            {priorityOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs mt-1 text-gray-600">Priority will reflect color coding.</p>
        </div>

        {/* Task Status */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="taskstatus">
            Task Status
          </label>
          <select
            id="taskstatus"
            {...register("taskstatus")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Target Date */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="targetDate">
            Target Date
          </label>
          <input
            id="targetDate"
            {...register("targetDate", { required: "Target Date is required" })}
            type="date"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.targetDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.targetDate && (
            <p className="text-red-500 text-sm mt-1">{errors.targetDate.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
