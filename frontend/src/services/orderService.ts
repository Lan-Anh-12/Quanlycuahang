import api from "./api";

// ======================================
// INTERFACES
// ======================================

export interface OrderRecord {
  maDH: string;
  maKH: string;
  maNV: string;
  ngayLap: string;
  tongTien: number;
}

export interface OrderDetail {
  maCTDH: string;
  maDH: string;
  maSP: string;
  soLuong: number;
  donGia: number;
  thanhTien: number;
}

export interface UpdateOrderRequest {
  maDH: string;
  chiTiet: {
    maSP: string;
    soLuong: number;
  }[];
}

// ======================================
// API BASE
// ======================================

const API_URL = "http://localhost:8080/quanly/donhang";

// ======================================
// LẤY TẤT CẢ ĐƠN HÀNG
// GET /tatca
// ======================================

export const getAllOrders = async (): Promise<OrderRecord[]> => {
  try {
    const res = await api.get(`${API_URL}/tatca`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy tất cả đơn hàng:", error);
    return [];
  }
};

// ======================================
// LẤY CHI TIẾT ĐƠN HÀNG
// GET /chitiet/{maDH}
// ======================================

export const getOrderDetails = async (maDH: string): Promise<OrderDetail[]> => {
  try {
    const res = await api.get(`${API_URL}/chitiet/${maDH}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    return [];
  }
};

// ======================================
// CẬP NHẬT ĐƠN HÀNG
// PUT /capnhat
// ======================================

export const updateOrder = async (data: UpdateOrderRequest): Promise<OrderRecord | null> => {
  try {
    const res = await api.put(`${API_URL}/capnhat`, data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error);
    return null;
  }
};

// ======================================
// TÌM KIẾM ĐƠN HÀNG
// GET /tim?keyword=xxx
// ======================================

export const searchOrders = async (keyword: string): Promise<OrderRecord[]> => {
  try {
    const res = await api.get(`${API_URL}/tim`, { params: { keyword } });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm đơn hàng:", error);
    return [];
  }
};
