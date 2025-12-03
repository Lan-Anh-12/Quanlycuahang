import { useState } from "react";
// ---- Định nghĩa kiểu sản phẩm ----
export interface Product {
  maSP: string;
  tenSP: string;
  anh: string;
  xuatXu: string;
  moTaNgan: string;
  huongDan: string;
  phanLoai: string;
}

// ---- Props ----
interface EditPopupProps {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void; // callback khi lưu
}

export default function EditProductPopup({
  product,
  onClose,
  onSave,
}: EditPopupProps) {
  const [form, setForm] = useState<Product>(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-xl animate-fadeIn relative">
        {/* Nút đóng (X) */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center mb-5">
          Sửa sản phẩm
        </h2>

        <div className="space-y-3">
          <input
            name="maSP"
            value={form.maSP}
            onChange={handleChange}
            placeholder="Mã sản phẩm"
            className="w-full p-2 border rounded"
          />

          <input
            name="tenSP"
            value={form.tenSP}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="w-full p-2 border rounded"
          />

          <input
            name="anh"
            value={form.anh}
            onChange={handleChange}
            placeholder="Link ảnh (URL)"
            className="w-full p-2 border rounded"
          />

          <input
            name="xuatXu"
            value={form.xuatXu}
            onChange={handleChange}
            placeholder="Xuất xứ"
            className="w-full p-2 border rounded"
          />

          <input
            name="moTaNgan"
            value={form.moTaNgan}
            onChange={handleChange}
            placeholder="Mô tả ngắn"
            className="w-full p-2 border rounded"
          />

          <textarea
            name="huongDan"
            value={form.huongDan}
            onChange={handleChange}
            placeholder="Hướng dẫn sử dụng"
            className="w-full p-2 border rounded"
          />

          <input
            name="phanLoai"
            value={form.phanLoai}
            onChange={handleChange}
            placeholder="Phân loại"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={() => onSave(form)}
          className="w-full bg-[#537B24] text-white py-2 mt-4 rounded hover:bg-[#44651d]"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
