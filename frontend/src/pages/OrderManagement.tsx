import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAllOrders,
  deleteOrder,
  getOrderDetails,
  type OrderRecord,
  type OrderDetail,
} from "../services/orderService";

import OrderDetailPopup from "../components/common/OrderDetailPopup";
import OrderEditPopup from "../components/common/OrderEditPopup";

// ====================================================================
// MOCK DATA (DỮ LIỆU DỰ PHÒNG CHỈ DÙNG KHI API THẤT BẠI)
// ====================================================================

const MOCK_ORDERS: OrderRecord[] = [
  { MaDH: 1, MaKH: 101, MaNV: 11, NgayLap: "2025-01-01", TongTien: 1500000 },
  { MaDH: 2, MaKH: 102, MaNV: 12, NgayLap: "2025-01-05", TongTien: 2300000 },
  { MaDH: 3, MaKH: 103, MaNV: 11, NgayLap: "2025-01-06", TongTien: 975000 },
];

const getMockDetails = (orderId: number): OrderDetail[] => {
  if (orderId === 1) {
    return [
      {
        MaCTDH: 1,
        MaDH: 1,
        MaSP: 201,
        SoLuong: 2,
        DonGia: 250000,
        ThanhTien: 500000,
      },
      {
        MaCTDH: 2,
        MaDH: 1,
        MaSP: 202,
        SoLuong: 1,
        DonGia: 1000000,
        ThanhTien: 1000000,
      },
    ];
  }
  return [
    {
      MaCTDH: 99,
      MaDH: orderId,
      MaSP: 299,
      SoLuong: 1,
      DonGia: 100000,
      ThanhTien: 100000,
    },
  ];
};

// ====================================================================
// COMPONENT CHÍNH: OrderManagement
// ====================================================================

export default function OrderManagement() {
  const pageSize = 10;

  // ------------------------------------
  // STATE QUẢN LÝ DỮ LIỆU
  // ------------------------------------
  const [allOrders, setAllOrders] = useState<OrderRecord[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // ------------------------------------
  // STATE POPUPS/DIALOGS
  // ------------------------------------
  const [detailTarget, setDetailTarget] = useState<OrderRecord | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const [editTarget, setEditTarget] = useState<OrderRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OrderRecord | null>(null);

  // ==================================================================
  // TẢI DỮ LIỆU (FETCH DATA) - Ưu tiên API thật, dùng Mock nếu lỗi
  // ==================================================================

  const fetchData = useCallback(async () => {
    try {
      // 1. THỬ TẢI DỮ LIỆU TỪ API THẬT
      const data = await getAllOrders();
      setAllOrders(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu API. Dùng dữ liệu Mock:", error);
      // 2. DÙNG DỮ LIỆU DỰ PHÒNG (FALLBACK)
      setAllOrders(MOCK_ORDERS);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==================================================================
  // LỌC, SẮP XẾP, PHÂN TRANG
  // ==================================================================

  const { orders, totalPages } = useMemo(() => {
    let filtered = [...allOrders];

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (o) =>
          String(o.MaDH).includes(search) ||
          String(o.MaKH).includes(search) ||
          String(o.MaNV).includes(search)
      );
    }

    if (sort === "dateAsc") {
      filtered.sort((a, b) => a.NgayLap.localeCompare(b.NgayLap));
    } else if (sort === "dateDesc") {
      filtered.sort((a, b) => b.NgayLap.localeCompare(a.NgayLap));
    }

    const total = filtered.length;
    const calculatedTotalPages = Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedOrders = filtered.slice(start, end);

    return {
      orders: paginatedOrders,
      totalPages: calculatedTotalPages || 1,
    };
  }, [allOrders, search, sort, page]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (page === 0 && totalPages > 0) {
      setPage(1);
    }
  }, [page, totalPages]);

  // ==================================================================
  // HÀM XỬ LÝ SỰ KIỆN
  // ==================================================================

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  // ----------------------
  // VIEW DETAIL - Ưu tiên API thật, dùng Mock nếu lỗi
  // ----------------------
  const openDetailPopup = async (order: OrderRecord) => {
    setDetailTarget(order);
    setOrderDetails([]);

    try {
      // 1. THỬ GỌI API THẬT
      const details = await getOrderDetails(order.MaDH);
      setOrderDetails(details);
    } catch (err) {
      console.error("Lỗi lấy chi tiết đơn hàng API. Dùng chi tiết Mock:", err);
      // 2. DÙNG DỮ LIỆU DỰ PHÒNG (FALLBACK)
      const mockDetails = getMockDetails(order.MaDH);
      setOrderDetails(mockDetails);
    }
  };

  const closeDetailPopup = () => {
    setDetailTarget(null);
    setOrderDetails([]);
  };

  // ----------------------
  // DELETE - Ưu tiên API thật
  // ----------------------
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      // GỌI API THẬT
      const ok = await deleteOrder(deleteTarget.MaDH);

      if (ok) {
        setAllOrders((prev) =>
          prev.filter((x) => x.MaDH !== deleteTarget.MaDH)
        );
        setDeleteTarget(null);
      } else {
        alert("Xóa thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      // Nếu API thật lỗi, thông báo lỗi (KHÔNG DÙNG Mock cho việc xóa)
      console.error("Lỗi xóa đơn hàng:", error);
      alert(
        "Đã xảy ra lỗi trong quá trình xóa đơn hàng. Vui lòng kiểm tra kết nối."
      );
    }
  };

  // ----------------------
  // EDIT SUCCESS
  // ----------------------
  const handleEditSuccess = () => {
    setEditTarget(null);
    fetchData();
  };

  // ==================================================================
  // RENDER UI
  // ==================================================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* TOP BAR: SEARCH & SORT */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm theo Mã ĐH/KH/NV..."
            className="border rounded px-4 py-2 w-80 shadow-sm focus:ring-[#A7D388] focus:border-[#A7D388]"
            value={search}
            onChange={handleSearchChange}
          />

          <button
            onClick={() => setPage(1)}
            className="bg-[#537B24] text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Tìm
          </button>

          <select
            className="border px-3 py-2 rounded shadow-sm focus:ring-[#A7D388] focus:border-[#A7D388]"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">--- Sắp xếp ---</option>
            <option value="dateAsc">Ngày lập (cũ nhất)</option>
            <option value="dateDesc">Ngày lập (mới nhất)</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#A7D388] text-[#537B24] font-semibold sticky top-0">
            <tr>
              <th className="p-3 w-20">Mã ĐH</th>
              <th className="p-3 w-20">Mã KH</th>
              <th className="p-3 w-20">Mã NV</th>
              <th className="p-3 w-40">Ngày lập</th>
              <th className="p-3 w-40">Tổng tiền</th>
              <th className="p-3 text-center w-64">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Không tìm thấy đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o.MaDH}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-mono">{o.MaDH}</td>
                  <td className="p-3">{o.MaKH}</td>
                  <td className="p-3">{o.MaNV}</td>
                  <td className="p-3">{o.NgayLap}</td>
                  <td className="p-3 font-semibold text-green-700">
                    {o.TongTien.toLocaleString("vi-VN")} đ
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition shadow-md"
                        onClick={() => openDetailPopup(o)}
                      >
                        Xem
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition shadow-md"
                        onClick={() => setEditTarget(o)}
                      >
                        Sửa
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition shadow-md"
                        onClick={() => setDeleteTarget(o)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-md border text-sm transition ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            ← Trang Trước
          </button>

          <span className="text-gray-600 text-sm">
            Trang <b className="text-[#537B24]">{page}</b> / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-md border text-sm transition ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Trang Sau →
          </button>
        </div>
      )}

      {/* POPUPS */}
      {/* Chi tiết đơn hàng */}
      {detailTarget && (
        <OrderDetailPopup
          data={{ record: detailTarget, detail: orderDetails }}
          onClose={closeDetailPopup}
        />
      )}

      {/* Sửa đơn hàng */}
      {editTarget && (
        <OrderEditPopup
          order={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* XÓA (DELETE CONFIRMATION) POPUP */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm relative">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Xác nhận xóa
            </h2>
            <p className="text-gray-700">
              Bạn chắc chắn muốn <b className="font-bold text-red-600">XÓA</b>{" "}
              đơn hàng{" "}
              <span className="text-red-600 font-bold text-lg">
                #{deleteTarget.MaDH}
              </span>
              ? Thao tác này không thể hoàn tác.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
                onClick={() => setDeleteTarget(null)}
              >
                Huỷ
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-md"
                onClick={handleDeleteConfirm}
              >
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
