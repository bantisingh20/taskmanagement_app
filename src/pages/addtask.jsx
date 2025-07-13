import React from "react";
import { useForm } from "react-hook-form";
import { useSubmitHook } from "../hooks/useSubmithook";

const AddTask = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Using the custom hook for submitting the task data
  const { loading, error, successMessage, submitData } = useSubmitHook("tasks");

  const onSubmit = async (formData) => {
    // Submit the form data using the custom hook's submitData function
    await submitData(formData);
  };

  return (
    <div className="w-full max-w-full bg-white rounded-lg shadow-md border border-sky-100 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-sky-700 mb-4 text-center">
        Add Task
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" onSubmit={handleSubmit(onSubmit)}>
        {/* Task Name */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1">Task Name</label>
          <input
            type="text"
            placeholder="Enter task title"
            {...register("taskname", { required: "Task Name is required" })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
          {errors.taskname && <p>{errors.taskname.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            rows="3"
            placeholder="Task details..."
            {...register("taskdescription", { required: "Task Description is required" })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400 resize-none"
          ></textarea>
          {errors.taskdescription && <p>{errors.taskdescription.message}</p>}
        </div>

        {/* Target Date */}
        <div>
          <label className="block text-gray-700 mb-1">Target Date</label>
          <input
            type="date"
            {...register("targetdate", {
              required: "Date is required",
              validate: {
                futureDate: (value) => {
                  const today = new Date();
                  const selectedDate = new Date(value);
                  if (selectedDate < today) {
                    return "Date must be in the future";
                  }
                  return true;
                },
              },
            })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
          {errors.targetdate && <p>{errors.targetdate.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-gray-700 mb-1">Priority</label>
          <select
            {...register("priority", { required: "Please select an option" })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p>{errors.priority.message}</p>}
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            {...register("status", { required: "Please select an option" })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            <option value="">Select</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-1">
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition text-sm"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Display loading/error/success messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default AddTask;
