import React, { useState } from "react";
import { updateOrder } from "../../services/orderService";
import type { Order } from "../../services/orderService";

interface EditOrderPopupProps {
  order: Order;
  onClose: () => void;
  onSuccess: () => void;
}

const OrderEditPopup: React.FC<EditOrderPopupProps> = ({
  order,
  onClose,
  onSuccess,
}) => {
  const [maKH, setMaKH] = useState(order.MaKH);
  const [maNV, setMaNV] = useState(order.MaNV);
  const [ngayLap, setNgayLap] = useState(order.NgayLap);
  const [tongTien, setTongTien] = useState(order.TongTien);

  const handleSave = async () => {
    await updateOrder(order.MaDH, {
      MaKH: maKH,
      MaNV: maNV,
      NgayLap: ngayLap,
      TongTien: tongTien,
    });

    onSuccess(); // reload lại danh sách
    onClose(); // đóng popup
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[420px] shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-[#537B24]">
          Sửa đơn hàng
        </h2>

        {/* Mã KH */}
        <label className="block mb-1 font-medium">Mã khách hàng</label>
        <input
          className="w-full border p-2 rounded mb-3"
          type="number"
          value={maKH}
          onChange={(e) => setMaKH(Number(e.target.value))}
        />

        {/* Mã NV */}
        <label className="block mb-1 font-medium">Mã nhân viên</label>
        <input
          className="w-full border p-2 rounded mb-3"
          type="number"
          value={maNV}
          onChange={(e) => setMaNV(Number(e.target.value))}
        />

        {/* Ngày lập */}
        <label className="block mb-1 font-medium">Ngày lập</label>
        <input
          className="w-full border p-2 rounded mb-3"
          type="date"
          value={ngayLap}
          onChange={(e) => setNgayLap(e.target.value)}
        />

        {/* Tổng tiền */}
        <label className="block mb-1 font-medium">Tổng tiền</label>
        <input
          className="w-full border p-2 rounded mb-4"
          type="number"
          value={tongTien}
          onChange={(e) => setTongTien(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>

          <button
            className="px-3 py-2 bg-[#537B24] text-white rounded hover:bg-[#44651d]"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPopup;
