// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // backend của bạn

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, matkhau: password }, // trùng với field backend
        { withCredentials: true }        // quan trọng để gửi cookie
      );
      return response.data; // có thể là token hoặc thông tin user
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error: any) {
      console.error(error.response?.data || error);
    }
  },

  // nếu có refresh token
  refreshToken: async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
};
