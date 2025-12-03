// Interface Employee
export interface Employee {
  MaNV: number;
  HoTen: string;
  SoDienThoai: string;
  email: string;
  NgayVaoLam: string;
  MaTK: number;
}

import axios from "axios";
// import { Employee } from "../types/Employee";

const API_URL = "http://localhost:8080/api/nhanvien";

// Lấy danh sách nhân viên
export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Thêm nhân viên
export const addEmployee = async (data: Employee) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật nhân viên
export const updateEmployee = async (id: number, data: Employee) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa nhân viên
export const deleteEmployee = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
