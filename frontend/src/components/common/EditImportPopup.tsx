import React, { useState, useEffect } from "react";
import {
  updateImport,
  getImportDetails,
  deleteImportDetail,
  type ImportRecord,
  type ImportDetail,
} from "../../services/importService";

interface Props {
  record: ImportRecord;
  onClose: () => void;
  onSave: (updated: ImportRecord) => void; // ✔ sửa đúng kiểu
}

export default function EditImportPopup({ record, onClose, onSave }: Props) {
  const [form, setForm] = useState<ImportRecord>(record);
  const [details, setDetails] = useState<ImportDetail[]>([]);

  useEffect(() => {
    (async () => {
      const detailList = await getImportDetails(record.MaNK);
      setDetails(detailList);
    })();
  }, [record.MaNK]);

  const updateDetailField = (
    index: number,
    field: keyof ImportDetail,
    value: number
  ) => {
    const updated = [...details];
    updated[index][field] = value;
    updated[index].ThanhTien = updated[index].SoLuong * updated[index].DonGia;

    setDetails(updated);

    const newTotal = updated.reduce((s, d) => s + d.ThanhTien, 0);
    setForm({ ...form, TongTien: newTotal });
  };

  const handleSave = async () => {
    const res = await updateImport(form.MaNK, form);
    if (res) {
      onSave(form); // ✔ trả dữ liệu đã sửa ra ngoài
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[550px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-[#537B24]">
          Sửa phiếu nhập
        </h3>

        <div className="space-y-3">
          <div>
            <label className="font-semibold">Mã nhân viên</label>
            <input
              type="number"
              value={form.MaNV}
              className="w-full border rounded px-3 py-2"
              onChange={(e) =>
                setForm({ ...form, MaNV: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="font-semibold">Nhà cung cấp</label>
            <input
              type="text"
              value={form.NhaCungCap}
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setForm({ ...form, NhaCungCap: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Ngày nhập</label>
            <input
              type="datetime-local"
              value={form.NgayNhap.slice(0, 16)}
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setForm({ ...form, NgayNhap: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Tổng tiền</label>
            <input
              value={form.TongTien.toLocaleString("vi-VN")}
              className="w-full border rounded px-3 py-2 bg-gray-100"
              disabled
            />
          </div>
        </div>

        <h4 className="text-lg font-semibold mt-5 mb-2">Chi tiết sản phẩm</h4>

        <div className="border rounded max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Mã SP</th>
                <th className="p-2">SL</th>
                <th className="p-2">Đơn giá</th>
                <th className="p-2">Thành tiền</th>
              </tr>
            </thead>

            <tbody>
              {details.map((d, index) => (
                <tr key={d.MaCTNK} className="border-b">
                  <td className="p-2">{d.MaSP}</td>

                  <td className="p-2">
                    <input
                      type="number"
                      value={d.SoLuong}
                      className="border rounded px-2 py-1 w-20"
                      onChange={(e) =>
                        updateDetailField(
                          index,
                          "SoLuong",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      value={d.DonGia}
                      className="border rounded px-2 py-1 w-24"
                      onChange={(e) =>
                        updateDetailField(
                          index,
                          "DonGia",
                          Number(e.target.value)
                        )
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

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>

          <button
            className="px-4 py-2 bg-[#537B24] text-white rounded hover:bg-[#45691D]"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
