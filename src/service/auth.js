import axiosInstance from "./axiosInstance";

class AuthService {
  // Method to get status
  async Register(formData) {
    try {
      const response = await axiosInstance.post("/auth/register",formData);
      return response;
    } catch (error) {
      console.error("Error getting status:", error);
      throw error;
    }
  }

  async Login(formData) {
    try {
      console.log(formData);
      const response = await axiosInstance.post("/auth/login", formData);
      return response;
    } catch (error) {
      console.error("Error getting status:", error);
      throw error;
    }
  }
 
}

export default new AuthService();
