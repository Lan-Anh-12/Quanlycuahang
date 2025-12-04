import React, { useState } from "react";
import type { OrderRecord, OrderDetail } from "../../services/orderService";
import { updateOrder, type UpdateOrderRequest } from "../../services/orderService";

interface Props {
  order: OrderRecord;
  onClose: () => void;
  onSuccess: () => void;
  details: OrderDetail[];
}

const OrderEditPopup: React.FC<Props> = ({ order, onClose, onSuccess, details }) => {
  // Khởi tạo chi tiết đơn hàng
  const [chiTiet, setChiTiet] = useState(
    details.map(d => ({ maSP: d.maSP, soLuong: d.soLuong }))
  );

  const handleQtyChange = (index: number, value: number) => {
    setChiTiet(prev =>
      prev.map((item, i) => (i === index ? { ...item, soLuong: value } : item))
    );
  };

  const handleSave = async () => {
    const payload: UpdateOrderRequest = {
      maDH: order.maDH,
      chiTiet: chiTiet,
    };

    await updateOrder(payload);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-[#537B24]">
          Sửa đơn hàng #{order.maDH}
        </h2>

        {chiTiet.map((item, idx) => (
          <div key={item.maSP} className="mb-3 flex gap-2 items-center">
            <span className="w-1/2">{item.maSP}</span>
            <input
              type="number"
              className="border rounded p-1 w-1/2"
              value={item.soLuong}
              onChange={e => handleQtyChange(idx, Number(e.target.value))}
              min={0}
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-3 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
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
