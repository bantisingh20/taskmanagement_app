import axiosInstance from "./axiosInstance";

class StatusService {
  // Method to get status
  async getStatus() {
    try {
      const response = await axiosInstance.get("/status/get");
      return response;
    } catch (error) {
      console.error("Error getting status:", error);
      throw error;
    }
  }

  // Method to create status
  async createStatus(data) {
    try {
      const response = await axiosInstance.post("/status/add", data);
      return response;
    } catch (error) {
      console.error("Error creating status:", error);
      throw error;
    }
  }

  // Method to update status
  async updateStatus(id, data) {
    try {
      const response = await axiosInstance.put(`/status/update/${id}`, data);
      return response;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  }

  // Method to delete status
  async deleteStatus(id) {
    try {
      const response = await axiosInstance.delete(`/status/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting status:", error);
      throw error;
    }
  }

  // Method to toggle status active/inactive
  async makeActiveOrInactive(id) {
    try {
      const response = await axiosInstance.patch(`/status/${id}/status`, { status: true });
      return response;
    } catch (error) {
      console.error("Error toggling status:", error);
      throw error;
    }
  }
}

export default new StatusService();
