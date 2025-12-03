import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import type { Employee } from "../services/employeeService";

import AddEmployeePopup from "../components/common/AddEmployeePopup";
import EditEmployeePopup from "../components/common/EditEmployeePopup";

export default function EmployeeManagement() {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // <-- state để popup xóa -->
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  // MOCK DATA (thử)
  const fetchData = async () => {
    try {
      const mockEmployees: Employee[] = [
        {
          MaNV: 1,
          HoTen: "Nguyễn Văn A",
          SoDienThoai: "0901234567",
          email: "a@example.com",
          NgayVaoLam: "2023-01-10",
          MaTK: 101,
        },
        {
          MaNV: 2,
          HoTen: "Trần Thị B",
          SoDienThoai: "0909876543",
          email: "b@example.com",
          NgayVaoLam: "2023-03-22",
          MaTK: 102,
        },
        {
          MaNV: 3,
          HoTen: "Lê Văn C",
          SoDienThoai: "093555666",
          email: "c@example.com",
          NgayVaoLam: "2022-11-15",
          MaTK: 103,
        },
      ];

      setAllEmployees(mockEmployees);
    } catch (error) {
      console.error("Lỗi load nhân viên:", error);
    }
  };
  // const fetchData = async () => {
  //   try {
  //     const res = await getEmployees();
  //     setEmployees(res);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách nhân viên:", error);
  //   }
  // };
  useEffect(() => {
    fetchData();
  }, []);

  // FILTER + SORT + PAGINATION
  useEffect(() => {
    let filtered = [...allEmployees];

    if (search.trim() !== "") {
      filtered = filtered.filter((nv) =>
        nv.HoTen.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "nameAsc")
      filtered.sort((a, b) => a.HoTen.localeCompare(b.HoTen));
    if (sort === "nameDesc")
      filtered.sort((a, b) => b.HoTen.localeCompare(a.HoTen));

    const total = filtered.length;
    setTotalPages(Math.max(1, Math.ceil(total / pageSize)));

    const start = (page - 1) * pageSize;
    setEmployees(filtered.slice(start, start + pageSize));
  }, [allEmployees, search, sort, page]);

  // XÓA (gọi API)
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEmployee(deleteTarget.MaNV);
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm nhân viên..."
            className="border rounded px-4 py-2 w-72 shadow-sm focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <button
            onClick={() => setPage(1)}
            className="bg-[#537B24] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#45691D]"
          >
            Tìm
          </button>

          <select
            className="border px-3 py-2 rounded shadow-sm text-[#537B24]"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Sắp xếp</option>
            <option value="nameAsc">Tên A → Z</option>
            <option value="nameDesc">Tên Z → A</option>
          </select>
        </div>

        <button
          className="bg-[#537B24] text-white px-4 py-2 rounded-lg shadow hover:bg-[#45691D]"
          onClick={() => setShowAddPopup(true)}
        >
          + Thêm mới
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#A7D388] text-[#537B24] font-semibold">
            <tr>
              <th className="p-3">Mã NV</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ngày vào làm</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((nv) => (
              <tr
                key={nv.MaNV}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{nv.MaNV}</td>
                <td className="p-3">{nv.HoTen}</td>
                <td className="p-3">{nv.SoDienThoai}</td>
                <td className="p-3">{nv.email}</td>
                <td className="p-3">{nv.NgayVaoLam}</td>

                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    className="bg-sky-500 text-white px-3 py-1 rounded-lg hover:bg-sky-600"
                    onClick={() => setEditTarget(nv)}
                  >
                    Sửa
                  </button>

                  {/* === LƯU Ý: dùng "nv" ở đây (khớp với map) === */}
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    onClick={() => setDeleteTarget(nv)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-md border ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-600">
          Trang <b>{page}</b> / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md border ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>

      {/* POPUP ADD */}
      {showAddPopup && (
        <AddEmployeePopup
          onClose={() => setShowAddPopup(false)}
          onSuccess={() => {
            setShowAddPopup(false);
            fetchData();
          }}
        />
      )}

      {/* POPUP EDIT */}
      {editTarget && (
        <EditEmployeePopup
          employee={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => {
            setEditTarget(null);
            fetchData();
          }}
        />
      )}

      {/* ==== POPUP XÓA NHÂN VIÊN ==== */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <h2 className="text-lg font-semibold">
              Bạn chắc chắn muốn xoá{" "}
              <span className="text-red-600">{deleteTarget.HoTen}</span>?
            </h2>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setDeleteTarget(null)}
              >
                Huỷ
              </button>

              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleDeleteConfirm}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
