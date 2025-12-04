// src/services/inventoryService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api";

// =======================
// Interface Product
// =======================
export interface SanPhamResponse {
  maSP: number;
  tenSP: string;
  gia: number;
  hinhAnh: string;
  phanLoai: string;
  moTa?: string;
  xuatXu?: string;
  huongDan?: string;
}

// =======================
// Lấy tất cả sản phẩm còn bán
// GET /api/sanpham/conban
// =======================
export const sanPhamConBan = async (): Promise<SanPhamResponse[]> => {
  const res = await axios.get<SanPhamResponse[]>(`${API_URL}/sanpham/conban`);
  return res.data;
};

// =======================
// Tìm kiếm sản phẩm theo phân loại
// GET /api/sanpham/timkiem?phanLoai=xxx
// =======================
export const searchSanPham = async (
  phanLoai: string
): Promise<SanPhamResponse[]> => {
  const res = await axios.get<SanPhamResponse[]>(`${API_URL}/sanpham/timkiem`, {
    params: { phanLoai },
  });
  return res.data;
};

// =======================
// Lấy chi tiết 1 sản phẩm
// GET /api/sanpham/{maSP}
// =======================
export const getSanPhamById = async (
  maSP: number
): Promise<SanPhamResponse> => {
  const res = await axios.get<SanPhamResponse>(`${API_URL}/sanpham/${maSP}`);
  return res.data;
};

// =======================
// Thêm sản phẩm mới
// POST /api/sanpham
// =======================
export interface SanPhamCreateRequest {
  tenSP: string;
  gia: number;
  hinhAnh: string;
  phanLoai: string;
  moTa?: string;
  xuatXu?: string;
  huongDan?: string;
}

export const createSanPham = async (
  data: SanPhamCreateRequest
): Promise<SanPhamResponse> => {
  const res = await axios.post<SanPhamResponse>(`${API_URL}/sanpham`, data);
  return res.data;
};

// =======================
// Update sản phẩm
// PUT /api/sanpham/{maSP}
// =======================
export const updateSanPham = async (
  maSP: number,
  data: Partial<SanPhamCreateRequest>
): Promise<SanPhamResponse> => {
  const res = await axios.put<SanPhamResponse>(
    `${API_URL}/sanpham/${maSP}`,
    data
  );
  return res.data;
};

// =======================
// Xóa sản phẩm
// DELETE /api/sanpham/{maSP}
// =======================
export const deleteSanPham = async (maSP: number): Promise<void> => {
  await axios.delete(`${API_URL}/sanpham/${maSP}`);
};
