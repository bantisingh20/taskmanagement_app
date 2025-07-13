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

export const StatusPage = () => {
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
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex">
                    {/* Main Content */}
                    <div className={`flex-1 transition-all duration-300 ${isModalOpen ? 'mr-80' : ''}`}>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Task Status Management</h1>
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
                        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transition-all duration-300">
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
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Status Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register("name", { required: "Status name is required" })}
                                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                            placeholder="Enter status name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                            Color Indicator
                                        </label>
                                        <select
                                            id="color"
                                            {...register("color", { required: "Color is required" })}
                                            className={`w-full px-3 py-2 border ${errors.color ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        >
                                            <option value="bg-gray-500">Gray</option>
                                            <option value="bg-blue-500">Blue</option>
                                            <option value="bg-red-500">Red</option>
                                            <option value="bg-green-500">Green</option>
                                            <option value="bg-yellow-500">Yellow</option>
                                            <option value="bg-purple-500">Purple</option>
                                            <option value="bg-pink-500">Pink</option>
                                        </select>
                                        {errors.color && (
                                            <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
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
    );
};
