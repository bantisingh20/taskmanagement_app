import axiosInstance from "./axiosInstance";

// export const getpriority = async () => {
//   try {
//     return await axiosInstance.get('/priority/get-all-prioritys');
//     //return response;
//   } catch (error) {
//     console.error('Error fetching priorities:', error);
//     return { error: error.message };
//   }
// };

export const getpriority = async () => {
    return await axiosInstance.get('/priority/get-all-prioritys');
};
    
export const createPriority = async (priority) => {
  try {
    return await axiosInstance.post('/priority/add', priority);
    //return response.data;
  } catch (error) {
    console.error('Error creating priority:', error);
    return { error: error.message };
  }
};

export const updatePriority = async (priorityId, priority) => {
  try {
    return await axiosInstance.put(`/priority/update/${priorityId}`, priority);
  } catch (error) {
    console.error('Error updating priority:', error);
    return { error: error.message };
  }
};

export const deletePriority = async (priorityId) => {
  try {
    return await axiosInstance.delete(`/priority/${priorityId}`);
  } catch (error) {
    console.error('Error deleting priority:', error);
    return { error: error.message };
  }
};

export const makeActiveorInactive = async (priorityId) => {
    //const priority = await getpriority(priorityId);
    const updatedStatus = true;

    try {
      return await axiosInstance.patch(`/priority/${priorityId}/status`, { status: updatedStatus });
    } catch (error) {
      console.error('Error toggling priority status:', error);
      return { error: error.message };
    }
};
