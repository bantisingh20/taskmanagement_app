import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Priority = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priorityList, setPriorityList] = useState([
    { id: 1, name: 'Critical', status: 'Active' },
    { id: 2, name: 'High', status: 'Inactive' },
    { id: 3, name: 'Medium', status: 'Active' }
  ]);
  const [currentPriority, setCurrentPriority] = useState(null);

  const onSubmit = (data) => {
    if (currentPriority) {
      // Update existing priority
      setPriorityList(priorityList.map(p => 
        p.id === currentPriority.id ? { ...p, name: data.name } : p
      ));
    } else {
      // Add new priority
      const newPriority = {
        id: priorityList.length + 1,
        name: data.name,
        status: 'Active'
      };
      setPriorityList([...priorityList, newPriority]);
    }
    closeModal();
  };

  const changeStatus = (id) => {
    setPriorityList(priorityList.map(p => 
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
    ));
  };

  const deletePriority = (id) => {
    setPriorityList(priorityList.filter(p => p.id !== id));
  };

  const openModal = (priority = null) => {
    setCurrentPriority(priority);
    setIsModalOpen(true);
    if (priority) {
      reset({ name: priority.name });
    } else {
      reset();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPriority(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${isModalOpen ? 'mr-80' : ''}`}>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Priority Management</h1>
              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Priority
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sr No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {priorityList.map((priority, index) => (
                    <tr key={priority.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {priority.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${priority.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {priority.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal(priority)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePriority(priority.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => changeStatus(priority.id)}
                          className={`${priority.status === 'Active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {priority.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side Modal */}
          {isModalOpen && (
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentPriority ? 'Edit Priority' : 'Add Priority'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Priority name is required" })}
                      className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter priority name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {currentPriority && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${currentPriority.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {currentPriority.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeStatus(currentPriority.id)}
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
                      className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {currentPriority ? 'Update' : 'Save'} Priority
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
