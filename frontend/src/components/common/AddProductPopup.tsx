import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createProduct, type Product, type ProductRequest } from "../../services/productService";

interface AddProductPopupProps {
  onClose: () => void;
  onSuccess: (newProduct: Product) => void;
}

export default function AddProductPopup({ onClose, onSuccess }: AddProductPopupProps) {
  const [form, setForm] = useState<ProductRequest>({
    tenSP: "",
    phanLoai: "",
    giaBan: 0,
    moTa: "",
    soLuong: 0,
    url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "giaBan" || name === "soLuong" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.tenSP || !form.phanLoai || !form.giaBan) {
      alert("Vui lòng nhập đầy đủ tên sản phẩm, phân loại và giá bán!");
      return;
    }

    try {
      const newProduct = await createProduct(form);
      onSuccess(newProduct);
      onClose();
    } catch (err: any) {
      console.error("Thêm sản phẩm lỗi:", err);
      alert(err.response?.data?.message || "Không thể thêm sản phẩm!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Thêm sản phẩm</h2>

        <div className="flex flex-col gap-3">
          <input
            name="tenSP"
            placeholder="Tên sản phẩm"
            value={form.tenSP}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="phanLoai"
            placeholder="Phân loại"
            value={form.phanLoai}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="giaBan"
            type="number"
            placeholder="Giá bán"
            value={form.giaBan}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="soLuong"
            type="number"
            placeholder="Số lượng tồn"
            value={form.soLuong}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="moTa"
            placeholder="Mô tả"
            value={form.moTa}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="url"
            placeholder="URL ảnh"
            value={form.url}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Thêm mới
        </button>
      </div>
    </div>
  );
}
