import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

// ==== DEFINE MODEL ====
export interface Customer {
  id: number;
  maKH: string;
  hoTen: string;
  namSinh: number;
  diaChi: string;
  sdt: string;
}

// ==== API CALL ====

// Lấy tất cả khách hàng
export const getCustomers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy khách hàng theo ID
export const getCustomerById = async (id: number | string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo mới
export const createCustomer = async (customer: any) => {
  const res = await axios.post(API_URL, customer);
  return res.data;
};

// Cập nhật
export const updateCustomer = async (id: number | string, customer: any) => {
  const res = await axios.put(`${API_URL}/${id}`, customer);
  return res.data;
};

// Xóa
export const deleteCustomer = async (id: number | string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
