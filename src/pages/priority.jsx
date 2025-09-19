import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useApi } from '../hooks/useApi';
import {createPriority, deletePriority, getpriority, makeActiveorInactive, updatePriority} from '../service/priority';
import { useSnackbar } from '../components/SnackbarProvider';


export const Priority = () => {
const { showSnackbar } = useSnackbar();
  const [theme, setTheme] = useState('teal'); // Default theme

  const switchTheme = (newTheme) => {
    const themeLink = document.getElementById('theme-link'); // Get the <link> element

    if (newTheme === 'teal') {
      themeLink.setAttribute('href', '/css/teal.css'); // Switch to teal theme
      setTheme('teal');
    } else {
      themeLink.setAttribute('href', '/css/purple.css'); // Switch to purple theme
      setTheme('purple');
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [list, setlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentitem, setcurrentitem ] = useState(null);

  //const { data, error, loading, execute, callApi } = useApi({ url: '', method: 'GET', autoFetch: false });

  const fetchPriorities = async () => {
    const response = await getpriority(); 
    if(response?.error){
      showSnackbar('Error fetching priorities: ' + response.error, 'error');
      return;
    }
    showSnackbar('Priorities fetched successfully', 'success');
    console.log('Fetched priorities data:', response);
   // const response = await execute({ url: '/priority/get-all-prioritys', method: 'GET' });
    setlist(response.data);
  };

  useEffect(() => {
    fetchPriorities();
  }, [list.length]);


  const onSubmit = async (formData) => {
    let response;
    if (currentitem) {
      // Update existing priority
      response = await updatePriority(currentitem._id, formData);
      if (response?.success) {
        setlist(list.map(p =>
          p._id === currentitem._id ? { ...p, name: formData.name } : p
        ));
      }
      // response = await execute({
      //   url: `/priority/update/${currentitem._id}`,
      //   method: 'PUT',
      //   body: formData,
      // });
      // if (response?.success) {
      //   setlist(list.map(p =>
      //     p._id === currentitem._id ? { ...p, name: formData.name } : p
      //   ));
      // }
    } else {
      // Create new priority
      response = await createPriority(formData);
      if (response?.success) {
        setlist([...list, response.data]);
      }
    }
    closeModal();
  };

  const deletebutton = async (id) => {
    const response = await deletePriority(id);

    if (response?.success) {
      setlist(list.filter(p => p._id !== id));
    }
  };

  const changeStatus = async (id) => {
    const priority = list.find(p => p._id === id);
    const updatedStatus = !priority.isActive;// === true ? false : true;

    // const response = await execute({
    //   url: `/priority/${id}/status`,
    //   method: 'PATCH',
    //   body: { status: updatedStatus },
    // });
    const response = await makeActiveorInactive(id);
    if (response?.success) {
      setlist(list.map(p =>
        p._id === id ? { ...p, isActive: updatedStatus } : p
      ));
      // console.log('Status updated successfully',list);

    }
  };

  const openModal = (priority = null) => {
    setcurrentitem(priority);
    setIsModalOpen(true);
    if (priority) {
      reset({ name: priority.name });
    } else {
      reset();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setcurrentitem(null);
    reset();
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* <div>
            <h1 className="text-lg font-semibold text-gray-800">Priority Management</h1>
            <button
              onClick={() => switchTheme(theme === "teal" ? "purple" : "teal")}
              
            >
              Toggle Theme (Current: {theme})
            </button>
          </div> */}

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${isModalOpen ? 'mr-0 sm:mr-80' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold text-gray-800">Priority</h1>
              <button
                onClick={() => { setIsModalOpen(true); reset(); setcurrentitem(null); }}
                className="flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="text-xs">Add Priority</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {list.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-xs">No priorities found.</div>
              ) : (
                <div className="overflow-x-auto max-h-[400px] sm:max-h-[600px]">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <thead className="bg-primary-600 text-white">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium">Sr No</th>
                        <th className="px-3 py-2 text-left text-xs font-medium">Priority Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium">Status</th>
                        <th className="px-3 py-2 text-right text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {list.map((item, index) => (
                        <tr
                          key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="px-3 py-2 text-sm text-gray-500">{index + 1}</td>
                          <td className="px-3 py-2 text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-3 py-2 text-sm">
                            <span
                              className={`px-2 inline-flex text-xs font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                            >
                              {item.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right text-sm space-x-1">
                            <button
                              onClick={() => openModal(item)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deletebutton(item._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => changeStatus(item._id)}
                              className={`${item.isActive ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'}`}
                            >
                              {item.isActive ? (
                                <XCircleIcon className="h-4 w-4" />
                              ) : (
                                <CheckCircleIcon className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Modal */}
          {isModalOpen && (
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-all duration-300 sm:w-96">
              <div className="flex flex-col h-full p-4 sm:p-6">

                {/* Header with Title & Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">

                  <button
                    type="submit"
                    form="priorityForm"
                    className="px-4 py-1 bg-primary text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    {currentitem ? 'Update' : 'Save'}
                  </button>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentitem ? 'Edit Priority' : 'Add Priority'}
                  </h3>

                  <button
                    onClick={closeModal}
                    className="px-3 py-1 bg-danger text-white border border-gray-300 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  {/* Close icon for mobile */}
                  <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 sm:hidden">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form
                  id="priorityForm"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 flex flex-col"
                >
                  {/* Priority Name Field */}
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

                  {/* You can uncomment and update this section if status functionality is needed later */}
                  {/* {currentitem && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium 
                ${currentitem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {currentitem.status}
              </span>
              <button
                type="button"
                onClick={() => changeStatus(currentitem.id)}
                className="ml-3 px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
              >
                Change Status
              </button>
            </div>
          </div>
        )} */}

                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
