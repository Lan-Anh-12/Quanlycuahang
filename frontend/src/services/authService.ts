import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const authService = {
  login: async (email: string, password: string): Promise<{ name: string }> => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },
};
