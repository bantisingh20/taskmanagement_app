import axiosInstance from "./axiosInstance";

class MenuService {
  // Method to get status
  async getStatus() {
    try {
      const response = await axiosInstance.get("/menu/getallmenu");
      return response;
    } catch (error) {
      console.error("Error getting status:", error);
      throw error;
    }
  }
 
}

export default new MenuService();
