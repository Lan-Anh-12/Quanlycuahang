import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../services/customerService";
import type { Customer } from "../services/customerService";
import EditCustomerPopup from "../components/common/EditCustomerPopup";

export default function CustomerManagement() {
  const navigate = useNavigate();

  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [editTarget, setEditTarget] = useState<Customer | null>(null);

  // ============================
  // FETCH DATA FROM API
  // ============================
  const fetchData = async () => {
    try {
      // Mock 3 khách hàng để test
      const mockCustomers: Customer[] = [
        {
          id: 1,
          maKH: "KH001",
          hoTen: "Nguyễn Văn A",
          namSinh: 1990,
          diaChi: "Hà Nội",
          sdt: "0901234567",
        },
        {
          id: 2,
          maKH: "KH002",
          hoTen: "Trần Thị B",
          namSinh: 1992,
          diaChi: "Hải Phòng",
          sdt: "0912345678",
        },
        {
          id: 3,
          maKH: "KH003",
          hoTen: "Lê Văn C",
          namSinh: 1988,
          diaChi: "Đà Nẵng",
          sdt: "0923456789",
        },
      ];

      // Gán mockCustomers vào state
      setAllCustomers(mockCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const res: any = await getCustomers();
  //     setAllCustomers(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // Load API 1 lần khi vào trang
  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // FILTER + SORT + PAGINATION (FE)
  // ============================
  useEffect(() => {
    let filtered = [...allCustomers];

    // 🔎 SEARCH
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (c) =>
          c.hoTen.toLowerCase().includes(search.toLowerCase()) ||
          c.sdt.includes(search)
      );
    }

    // 🔽 SORT
    if (sort === "nameAsc") {
      filtered.sort((a, b) => a.hoTen.localeCompare(b.hoTen));
    }
    if (sort === "nameDesc") {
      filtered.sort((a, b) => b.hoTen.localeCompare(a.hoTen));
    }

    // 📄 PAGINATION
    const total = filtered.length;
    setTotalPages(Math.ceil(total / pageSize));

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    setCustomers(filtered.slice(start, end));
  }, [allCustomers, search, sort, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ==== TOP BAR ==== */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Tìm khách hàng..."
            className="border rounded px-4 py-2 w-72 shadow-sm focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* SEARCH BUTTON */}
          <button
            onClick={() => setPage(1)}
            className="bg-[#537B24] text-white px-4 py-2 rounded font-semibold hover:bg-[#45691D]"
          >
            Tìm
          </button>

          {/* SORT */}
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
      </div>

      {/* ==== TABLE ==== */}
      <div className="bg-white rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#A7D388] text-[#537B24] font-semibold">
            <tr>
              <th className="p-3">Mã KH</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Năm sinh</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3">SĐT</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{c.maKH}</td>
                <td className="p-3">{c.hoTen}</td>
                <td className="p-3">{c.namSinh}</td>
                <td className="p-3">{c.diaChi}</td>
                <td className="p-3">{c.sdt}</td>

                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    className="bg-blue-400 text-white px-3 py-1 rounded-lg hover:bg-blue-500"
                    onClick={() => setEditTarget(c)}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === PAGINATION === */}
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

      {/* ==== POPUP EDIT ==== */}
      {editTarget && (
        <EditCustomerPopup
          customer={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => {
            setEditTarget(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
