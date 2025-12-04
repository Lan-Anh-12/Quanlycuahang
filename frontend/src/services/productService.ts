import api from "./api";

// URL gốc BE
const API_URL = "http://localhost:8080/quanly/khohang";

// ==== Interface ====
export interface Product {
  maSP: string;
  tenSP: string;
  phanLoai: string;
  giaBan: number;
  moTa: string;
  soLuongTon: number;
  url: string;
}

export interface ProductRequest {
  tenSP: string;
  phanLoai: string;
  giaBan: number;
  moTa: string;
  soLuong: number;
  url: string;
}

// ==== API ====

// Lấy tất cả sản phẩm còn bán
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>(`${API_URL}/sanpham/conban`);
  return res.data;
};

// Thêm sản phẩm mới
export const createProduct = async (data: ProductRequest): Promise<Product> => {
  const res = await api.post<Product>(`${API_URL}/taosp`, data);
  return res.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (maSP: string, data: ProductRequest): Promise<Product> => {
  const res = await api.put<Product>(`${API_URL}/suasp/${maSP}`, data);
  return res.data;
};

// Lấy chi tiết 1 sản phẩm theo mã
export const getProductById = async (maSP: string): Promise<Product> => {
  const all = await getAllProducts();
  const item = all.find(p => p.maSP === maSP);
  if (!item) throw new Error("Sản phẩm không tồn tại");
  return item;
};
