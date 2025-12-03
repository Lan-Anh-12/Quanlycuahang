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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="font-semibold">Mã nhân viên</label>
            <input
              type="number"
              className="border w-full px-3 py-2 rounded"
              value={order.MaNV}
              onChange={(e) =>
                setOrder({ ...order, MaNV: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="font-semibold">Tên khách hàng</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded"
              value={order.TenKH}
              onChange={(e) => setOrder({ ...order, TenKH: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Năm sinh</label>
            <input
              type="number"
              className="border w-full px-3 py-2 rounded"
              value={order.NamSinh}
              onChange={(e) => setOrder({ ...order, NamSinh: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">SĐT</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded"
              value={order.SDT}
              onChange={(e) => setOrder({ ...order, SDT: e.target.value })}
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Địa chỉ</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded"
              value={order.DiaChi}
              onChange={(e) => setOrder({ ...order, DiaChi: e.target.value })}
            />
          </div>
        </div>

        {/* ORDER DETAILS */}
        <h3 className="text-lg font-semibold mb-2">Chi tiết đơn hàng</h3>
        <button
          className="bg-sky-500 text-white px-3 py-1 rounded mb-2"
          onClick={addDetailRow}
        >
          + Thêm sản phẩm
        </button>

        <div className="border rounded max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Mã SP</th>
                <th className="p-2">Tên SP</th>
                <th className="p-2">SL</th>
                <th className="p-2">Đơn giá</th>
                <th className="p-2">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {details.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-20"
                      value={d.MaSP}
                      onChange={(e) =>
                        updateDetail(idx, "MaSP", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={d.TenSP}
                      onChange={(e) =>
                        updateDetail(idx, "TenSP", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-20"
                      value={d.SoLuong}
                      onChange={(e) =>
                        updateDetail(idx, "SoLuong", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-24"
                      value={d.DonGia}
                      onChange={(e) =>
                        updateDetail(idx, "DonGia", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-2 text-red-600">
                    {d.ThanhTien.toLocaleString("vi-VN")} ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL & BUTTON */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="font-semibold">Tổng tiền: </span>
            <span className="text-red-600 text-lg">
              {order.TongTien.toLocaleString("vi-VN")} ₫
            </span>
          </div>

          <button
            className="px-4 py-2 bg-[#537B24] text-white rounded"
            onClick={saveOrder}
          >
            Tạo đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
