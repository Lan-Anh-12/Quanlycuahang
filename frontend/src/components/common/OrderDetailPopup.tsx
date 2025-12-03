import React from "react";
import type { OrderRecord, OrderDetail } from "../../services/orderService";

interface Props {
  data: {
    record: OrderRecord;
    detail: OrderDetail[];
  };
  onClose: () => void;
}

export default function OrderDetailPopup({ data, onClose }: Props) {
  if (!data) return null;

  const { detail } = data;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[520px] max-h-[85vh] overflow-y-auto">
        {/* TITLE */}
        <h4 className="text-lg font-semibold mb-2 text-[#537B24]">
          Danh sách sản phẩm
        </h4>

        {/* DETAIL TABLE */}
        <div className="border rounded max-h-60 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Mã SP</th>
                <th className="p-2">Số lượng</th>
                <th className="p-2">Đơn giá</th>
              </tr>
            </thead>

            <tbody>
              {detail.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}

              {detail.map((d) => (
                <tr key={d.MaCTDH} className="border-b">
                  <td className="p-2">{d.MaSP}</td>
                  <td className="p-2">{d.SoLuong}</td>
                  <td className="p-2">{d.DonGia.toLocaleString("vi-VN")} ₫</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CLOSE BUTTON */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
