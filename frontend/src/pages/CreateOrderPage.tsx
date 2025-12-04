import React, { useState } from "react";
import {
  type OrderDetail,
  type OrderRecord,
  addOrderWithDetails,
} from "../../services/orderService";

interface OrderForm {
  MaNV: number;
  TenKH: string;
  NamSinh: string;
  DiaChi: string;
  SDT: string;
  NgayLap: string;
  TongTien: number;
}

interface OrderDetailForm {
  MaSP: number;
  TenSP: string;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
}

export default function CreateOrderPage() {
  const [order, setOrder] = useState<OrderForm>({
    MaNV: 0,
    TenKH: "",
    NamSinh: "",
    DiaChi: "",
    SDT: "",
    NgayLap: new Date().toISOString().slice(0, 16),
    TongTien: 0,
  });

  const [details, setDetails] = useState<OrderDetailForm[]>([]);

  // Thêm dòng chi tiết mới
  const addDetailRow = () => {
    setDetails([
      ...details,
      { MaSP: 0, TenSP: "", SoLuong: 1, DonGia: 0, ThanhTien: 0 },
    ]);
  };

  // Cập nhật chi tiết
  const updateDetail = (
    index: number,
    field: keyof OrderDetailForm,
    value: string | number
  ) => {
    const updated = [...details];

    // Cập nhật giá trị
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    // Tính lại thành tiền nếu thay đổi số lượng hoặc đơn giá
    if (field === "SoLuong" || field === "DonGia") {
      updated[index].ThanhTien = updated[index].SoLuong * updated[index].DonGia;
    }

    setDetails(updated);

    // Tính tổng tiền
    const total = updated.reduce((sum, d) => sum + d.ThanhTien, 0);
    setOrder({ ...order, TongTien: total });
  };

  // Lưu đơn hàng với chi tiết
  const saveOrder = async () => {
    try {
      // Chuyển details về format backend nhận được
      const detailsForBackend: Omit<OrderDetail, "MaCTDH" | "MaDH">[] =
        details.map((d) => ({
          MaSP: d.MaSP,
          SoLuong: d.SoLuong,
          DonGia: d.DonGia,
          ThanhTien: d.ThanhTien,
        }));

      // Chỉ gửi các field backend cần
      const backendOrder: Omit<OrderRecord, "MaDH"> = {
        MaKH: 0, // tạm thời map 0, sau có thể chọn khách hàng
        MaNV: order.MaNV,
        NgayLap: order.NgayLap,
        TongTien: order.TongTien,
      };

      await addOrderWithDetails(backendOrder, detailsForBackend);

      alert("Đơn hàng đã được tạo!");
      setOrder({
        MaNV: 0,
        TenKH: "",
        NamSinh: "",
        DiaChi: "",
        SDT: "",
        NgayLap: new Date().toISOString().slice(0, 16),
        TongTien: 0,
      });
      setDetails([]);
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tạo đơn hàng!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#537B24] mb-4">
          Tạo đơn hàng mới
        </h2>

        {/* CUSTOMER INFO */}
        <div className="grid grid-cols-2 gap-4 mb-6"></div>