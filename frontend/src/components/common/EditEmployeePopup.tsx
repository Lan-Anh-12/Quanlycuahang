import { useState } from "react";
import type { Employee } from "../../services/employeeService";
import { updateEmployee } from "../../services/employeeService";

interface Props {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditEmployeePopup({
  employee,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<Employee>({
    ...employee,
  });

  const handleChange = (field: keyof Employee, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateEmployee(form.MaNV, form);

      onSuccess(); // reload lại danh sách bên ngoài
    } catch (error) {
      console.error("Lỗi khi cập nhật nhân viên:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold text-[#537B24] mb-4 text-center">
          Sửa thông tin nhân viên
        </h2>

        {/* FORM */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="font-semibold">Họ tên</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={form.HoTen}
              onChange={(e) => handleChange("HoTen", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Số điện thoại</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={form.SoDienThoai}
              onChange={(e) => handleChange("SoDienThoai", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Ngày vào làm</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={form.NgayVaoLam}
              onChange={(e) => handleChange("NgayVaoLam", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Mã tài khoản</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={form.MaTK}
              onChange={(e) => handleChange("MaTK", Number(e.target.value))}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
