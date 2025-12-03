// ======================================
// INTERFACES
// ======================================
export interface ImportRecord {
  MaNK: number;
  MaNV: number;
  NhaCungCap: string;
  NgayNhap: string;
  TongTien: number;
}

export interface ImportDetail {
  MaCTNK: number;
  MaNK: number;
  MaSP: number;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
}

import axios from "axios";

const API_URL = "http://localhost:8080/api/import";

// ======================================
// GET ALL IMPORT RECORDS
// ======================================
export const getImports = async (): Promise<ImportRecord[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách nhập kho:", error);
    return [];
  }
};

// ======================================
// GET IMPORT BY ID
// ======================================
export const getImportById = async (
  id: number
): Promise<ImportRecord | null> => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin phiếu nhập:", error);
    return null;
  }
};

// ======================================
// ADD NEW IMPORT RECORD
// ======================================
export const addImport = async (data: ImportRecord) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi thêm phiếu nhập:", error);
    return null;
  }
};

// ======================================
// UPDATE IMPORT RECORD
// ======================================
export const updateImport = async (id: number, data: ImportRecord) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi cập nhật phiếu nhập:", error);
    return null;
  }
};

// ======================================
// DELETE IMPORT RECORD
// ======================================
export const deleteImport = async (id: number) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi xoá phiếu nhập:", error);
    return null;
  }
};

// ======================================
// GET DETAIL LIST BY MaNK
// ======================================
export const getImportDetails = async (
  importId: number
): Promise<ImportDetail[]> => {
  try {
    const res = await axios.get(`${API_URL}/${importId}/details`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy chi tiết nhập kho:", error);
    return [];
  }
};

// ======================================
// DELETE A DETAIL ROW
// ======================================
export const deleteImportDetail = async (detailId: number) => {
  try {
    const res = await axios.delete(`${API_URL}/details/${detailId}`);
    return res.data;
  } catch (error) {
    console.log("Lỗi khi xoá chi tiết nhập kho:", error);
    return null;
  }
};
