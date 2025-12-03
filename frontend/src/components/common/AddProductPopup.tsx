import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createProduct } from "../../services/productService";

interface AddProductPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductPopup({
  onClose,
  onSuccess,
}: AddProductPopupProps) {
  const [form, setForm] = useState({
    tensp: "",
    DonGia: "",
    SoLuong: "",
    MoTa: "",
    PhanLoai: "",
    image: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(form);
      alert("Thêm sản phẩm thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Không thể thêm sản phẩm!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#537B24] mb-5">
          Thêm sản phẩm
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="tensp"
            placeholder="Tên sản phẩm"
            className="border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            name="DonGia"
            placeholder="Đơn giá"
            type="number"
            className="border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            name="SoLuong"
            placeholder="Số lượng"
            type="number"
            className="border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <textarea
            name="MoTa"
            placeholder="Mô tả"
            className="border px-3 py-2 rounded h-16 resize-none"
            onChange={handleChange}
          />

          <input
            name="PhanLoai"
            placeholder="Phân loại"
            className="border px-3 py-2 rounded"
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Link ảnh (URL)"
            className="border px-3 py-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#537B24] text-white py-2 rounded mt-5 hover:bg-[#44651d]"
        >
          Thêm mới
        </button>
      </div>
    </div>
  );
}
