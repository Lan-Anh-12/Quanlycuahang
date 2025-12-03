import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { addEmployee } from "../../services/employeeService";

interface EmployeeForm {
  HoTen: string;
  SoDienThoai: string;
  email: string;
  TenTK: string;
  MatKhau: string; // Đây là trường mật khẩu, lấy từ form
}

interface AddEmployeePopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEmployeePopup({
  onClose,
  onSuccess,
}: AddEmployeePopupProps) {
  const [form, setForm] = useState<EmployeeForm>({
    HoTen: "",
    SoDienThoai: "",
    email: "",
    TenTK: "",
    MatKhau: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // ✅ KHẮC PHỤC LỖI TYPESCRIPT VÀ BẢO ĐẢM MẬT KHẨU ĐÚNG:
      // Tạo object mới bao gồm:
      // 1. Tất cả dữ liệu từ form (bao gồm MatKhau đã nhập)
      // 2. Các trường 'Employee' bắt buộc nhưng không có trong form nhập liệu (đặt giá trị mặc định).
      const employeeData = {
        ...form, // <--- MatKhau được lấy từ đây, không bị ghi đè
        MaNV: 0,
        NgayVaoLam: new Date().toISOString().split("T")[0], // Gán ngày hiện tại làm placeholder
        MaTK: 0,
      };

      await addEmployee(employeeData);
      alert("Thêm nhân viên thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Không thể thêm nhân viên!");
    }
  };
  // ... Phần JSX (giao diện) không thay đổi ...
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
          Thêm nhân viên
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="HoTen"
            placeholder="Họ tên"
            className="border px-3 py-2 rounded"
            value={form.HoTen}
            onChange={handleChange}
          />

          <input
            name="SoDienThoai"
            placeholder="Số điện thoại"
            className="border px-3 py-2 rounded"
            value={form.SoDienThoai}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="TenTK"
            placeholder="Tên tài khoản"
            className="border px-3 py-2 rounded"
            value={form.TenTK}
            onChange={handleChange}
          />

          <input
            name="MatKhau"
            type="password"
            placeholder="Mật khẩu tài khoản"
            className="border px-3 py-2 rounded"
            value={form.MatKhau}
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
