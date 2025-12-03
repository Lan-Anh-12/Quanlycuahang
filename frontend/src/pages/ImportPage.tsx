import { useEffect, useState } from "react";
import {
  getImports,
  deleteImport,
  getImportDetails,
  updateImport,
} from "../services/importService";

import ViewImportPopup from "../pages/ImportDetailPopup";
import EditImportPopup from "../components/common/EditImportPopup";
import AddImportPopup from "../components/common/AddImportPopup";

import type { ImportRecord } from "../services/importService";

import type { ImportDetail } from "../services/importService";

export default function ImportPage() {
  const [allImports, setAllImports] = useState<ImportRecord[]>([]);
  const [imports, setImports] = useState<ImportRecord[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<ImportRecord | null>(null);
  const [viewTarget, setViewTarget] = useState<any | null>(null);
  const [editTarget, setEditTarget] = useState<ImportRecord | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const fetchData = async () => {
    try {
      // THỬ LẤY DỮ LIỆU TỪ API TRƯỚC
      const apiImports = await getImports();
      if (apiImports && apiImports.length > 0) {
        setAllImports(apiImports);
        return;
      }

      console.log("⚠ API rỗng → sử dụng mock nhập kho");

      // ============================
      // MOCK IMPORT RECORDS
      // ============================
      const mockImports: ImportRecord[] = [];
      const mockDetails: Record<number, ImportDetail[]> = {};

      const random = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      for (let i = 1; i <= 5; i++) {
        const MaNK = 1000 + i;

        // Chi tiết 2–4 sản phẩm
        const numberOfItems = random(2, 4);
        const details: ImportDetail[] = [];
        let total = 0;

        for (let j = 1; j <= numberOfItems; j++) {
          const qty = random(1, 10);
          const price = random(50000, 200000);

          const item: ImportDetail = {
            MaCTNK: MaNK * 10 + j,
            MaNK,
            MaSP: 200 + j,
            SoLuong: qty,
            DonGia: price,
            ThanhTien: qty * price,
          };

          total += item.ThanhTien;
          details.push(item);
        }

        mockDetails[MaNK] = details;

        mockImports.push({
          MaNK,
          MaNV: 10 + (i % 3),
          NhaCungCap: `Nhà cung cấp ${i}`,
          NgayNhap: new Date(Date.now() - i * 86400000).toISOString(),
          TongTien: total,
        });
      }

      // Lưu tạm detail vào localStorage
      localStorage.setItem("mock-import-details", JSON.stringify(mockDetails));

      setAllImports(mockImports);
    } catch (err) {
      console.log("Lỗi fetch mock Import:", err);
    }
  };

  //   const fetchData = async () => {
  //     const data = await getImports();
  //     setAllImports(data);
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER + SORT + PAGINATION
  useEffect(() => {
    let filtered = [...allImports];

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (i) =>
          String(i.MaNK).includes(search) ||
          String(i.MaNV).includes(search) ||
          i.NhaCungCap.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "dateDesc") {
      filtered.sort(
        (a, b) =>
          new Date(b.NgayNhap).getTime() - new Date(a.NgayNhap).getTime()
      );
    }
    if (sort === "dateAsc") {
      filtered.sort(
        (a, b) =>
          new Date(a.NgayNhap).getTime() - new Date(b.NgayNhap).getTime()
      );
    }

    const total = filtered.length;
    setTotalPages(Math.max(1, Math.ceil(total / pageSize)));

    const start = (page - 1) * pageSize;
    setImports(filtered.slice(start, start + pageSize));
  }, [allImports, search, sort, page]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteImport(deleteTarget.MaNK);
    setDeleteTarget(null);
    fetchData();
  };

  const handleView = async (MaNK: number) => {
    const detail = await getImportDetails(MaNK);
    setViewTarget({
      record: allImports.find((i) => i.MaNK === MaNK),
      detail,
    });
  };

  // === Save edit ===
  const handleSaveEdit = async (updated: ImportRecord) => {
    await updateImport(updated.MaNK, updated);
    fetchData();
    setEditTarget(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm Mã NK / Mã NV / Nhà cung cấp..."
            className="border rounded px-4 py-2 w-80"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="border rounded px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sắp xếp</option>
            <option value="dateDesc">Ngày nhập: Mới → Cũ</option>
            <option value="dateAsc">Ngày nhập: Cũ → Mới</option>
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
              <th className="p-3">Mã NK</th>
              <th className="p-3">Mã NV</th>
              <th className="p-3">Nhà cung cấp</th>
              <th className="p-3">Ngày nhập</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {imports.map((i) => (
              <tr key={i.MaNK} className="border-b hover:bg-gray-100">
                <td className="p-3">{i.MaNK}</td>
                <td className="p-3">{i.MaNV}</td>
                <td className="p-3">{i.NhaCungCap}</td>
                <td className="p-3">
                  {new Date(i.NgayNhap).toLocaleString("vi-VN")}
                </td>
                <td className="p-3">{i.TongTien.toLocaleString("vi-VN")}</td>

                <td className="p-3 flex justify-center gap-3">
                  <button
                    className="bg-sky-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleView(i.MaNK)}
                  >
                    Xem
                  </button>

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => setEditTarget(i)}
                  >
                    Sửa
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => setDeleteTarget(i)}
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
          className="px-4 py-2 border rounded-md"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Trang <b>{page}</b> / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-md"
        >
          Next
        </button>
      </div>

      {/* POPUPS */}
      {viewTarget && (
        <ViewImportPopup
          data={viewTarget}
          onClose={() => setViewTarget(null)}
        />
      )}

      {editTarget && (
        <EditImportPopup
          record={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
        />
      )}

      {showAddPopup && (
        <AddImportPopup
          onClose={() => setShowAddPopup(false)}
          onAdded={() => {
            setShowAddPopup(false);
            fetchData();
          }}
        />
      )}

      {/* POPUP DELETE */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold">
              Bạn có chắc muốn xoá phiếu nhập{" "}
              <span className="text-red-600">{deleteTarget.MaNK}</span>?
            </h2>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteTarget(null)}
              >
                Huỷ
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
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
