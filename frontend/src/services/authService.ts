import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const authService = {
  // đăng nhập
  login: async (
    email: string,
    password: string
  ): Promise<{
    user: { id: number; name: string; email: string; role: string };
    token: string;
  }> => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },

  // đổi mật khẩu
  changePassword: async (
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const res = await axios.post(`${API_URL}/change-password`, {
      email,
      oldPassword,
      newPassword,
    });
    return res.data;
  },
};
