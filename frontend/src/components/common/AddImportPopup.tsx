import React, { useState } from "react";
import {
  addImport,
  type ImportDetail,
  type ImportRecord,
} from "../../services/importService";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

export default function AddImportPopup({ onClose, onAdded }: Props) {
  const [form, setForm] = useState<ImportRecord>({
    MaNK: 0,
    MaNV: 0,
    NhaCungCap: "",
    NgayNhap: new Date().toISOString().slice(0, 16),
    TongTien: 0,
  });

  const [details, setDetails] = useState<ImportDetail[]>([]);

  const addDetailRow = () => {
    setDetails([
      ...details,
      {
        MaCTNK: 0,
        MaNK: 0,
        MaSP: 0,
        SoLuong: 1,
        DonGia: 0,
        ThanhTien: 0,
      },
    ]);
  };

  const updateDetail = (
    index: number,
    field: keyof ImportDetail,
    value: number
  ) => {
    const updated = [...details];
    updated[index][field] = value;
    updated[index].ThanhTien = updated[index].SoLuong * updated[index].DonGia;

    setDetails(updated);

    const total = updated.reduce((sum, d) => sum + d.ThanhTien, 0);
    setForm({ ...form, TongTien: total });
  };

  const save = async () => {
    await addImport(form);
    onAdded();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[550px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#537B24]">
          Thêm phiếu nhập
        </h2>

        <div className="space-y-3">
          <div>
            <label className="font-semibold">Mã nhân viên</label>
            <input
              type="number"
              className="border w-full px-3 py-2 rounded"
              value={form.MaNV}
              onChange={(e) =>
                setForm({ ...form, MaNV: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="font-semibold">Nhà cung cấp</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded"
              value={form.NhaCungCap}
              onChange={(e) => setForm({ ...form, NhaCungCap: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Ngày nhập</label>
            <input
              type="datetime-local"
              className="border w-full px-3 py-2 rounded"
              value={form.NgayNhap}
              onChange={(e) => setForm({ ...form, NgayNhap: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Tổng tiền</label>
            <input
              disabled
              className="border w-full px-3 py-2 rounded bg-gray-100"
              value={form.TongTien.toLocaleString("vi-VN")}
            />
          </div>
        </div>

        {/* DETAILS */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Danh sách chi tiết</h3>

        <button
          className="bg-sky-500 text-white px-3 py-1 rounded mb-2"
          onClick={addDetailRow}
        >
          + Thêm dòng
        </button>

        <div className="border rounded max-h-60 overflow-y-auto">
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
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-20"
                      value={d.MaSP}
                      onChange={(e) =>
                        updateDetail(index, "MaSP", Number(e.target.value))
                      }
                    />
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-20"
                      value={d.SoLuong}
                      onChange={(e) =>
                        updateDetail(index, "SoLuong", Number(e.target.value))
                      }
                    />
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-24"
                      value={d.DonGia}
                      onChange={(e) =>
                        updateDetail(index, "DonGia", Number(e.target.value))
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

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>

          <button
            className="px-4 py-2 bg-[#537B24] text-white rounded"
            onClick={save}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
}
