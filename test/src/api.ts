import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // nếu dùng refresh token trong cookie
});

// Thêm token vào header cho mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// LOGIN
// =========================
export const login = async (username: string, matkhau: string) => {
  const res = await api.post("/auth/login", { username, matkhau });
  const token = res.data;
  localStorage.setItem("token", token); // lưu access token
  return token;
};

// =========================
// REFRESH TOKEN
// =========================
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken"); // nếu có
  const res = await api.post("/auth/refresh", { refreshToken });
  const token = res.data;
  localStorage.setItem("token", token);
  return token;
};

// =========================
// CHANGE PASSWORD
// =========================
export const changePassword = async (maTK: number, mkCu: string, mkMoi: string) => {
  const res = await api.post("/auth/change-password", { maTK, mkCu, mkMoi });
  return res.data;
};

export default api;
