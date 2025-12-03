// ======================================
// INTERFACES
// ======================================

export interface OrderRecord {
  MaDH: number;
  MaKH: number;
  MaNV: number;
  NgayLap: string;
  TongTien: number;
}

export interface OrderDetail {
  MaCTDH: number;
  MaDH: number;
  MaSP: number;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
}

import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

// ======================================
// GET ALL ORDERS
// ======================================

export const getAllOrders = async (): Promise<OrderRecord[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách đơn hàng:", error);
    return [];
  }
};

// ======================================
// GET ORDER BY ID
// ======================================

export const getOrderById = async (id: number): Promise<OrderRecord | null> => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin đơn hàng:", error);
    return null;
  }
};

// ======================================
// ADD NEW ORDER
// ======================================

export const addOrder = async (data: Omit<OrderRecord, "MaDH">) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi thêm đơn hàng:", error);
    return null;
  }
};

// ======================================
// UPDATE ORDER
// ======================================

export const updateOrder = async (id: number, data: Partial<OrderRecord>) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi cập nhật đơn hàng:", error);
    return null;
  }
};

// ======================================
// DELETE ORDER
// ======================================

export const deleteOrder = async (id: number) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi xoá đơn hàng:", error);
    return null;
  }
};

// ======================================
// GET ORDER DETAILS BY MaDH
// ======================================

export const getOrderDetails = async (
  orderId: number
): Promise<OrderDetail[]> => {
  try {
    const res = await axios.get(`${API_URL}/${orderId}/details`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy chi tiết đơn hàng:", error);
    return [];
  }
};

// ======================================
// DELETE A DETAIL ROW
// ======================================

export const deleteOrderDetail = async (detailId: number) => {
  try {
    const res = await axios.delete(`${API_URL}/details/${detailId}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi xoá chi tiết đơn hàng:", error);
    return null;
  }
};
