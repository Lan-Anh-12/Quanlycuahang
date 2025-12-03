import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAllOrders,
  deleteOrder,
  getOrderDetails,
  type OrderRecord,
  type OrderDetail,
} from "../../services/orderService";

import OrderDetailPopup from "../../components/common/OrderDetailPopup";
import OrderEditPopup from "../../components/common/OrderEditPopup";
import { useAuth } from "../../context/AuthContext";

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
// COMPONENT CHÍNH: OrderPageEmployee (DÀNH CHO NHÂN VIÊN)
// ====================================================================

export default function OrderPageEmployee() {
  const pageSize = 10;
  const { user } = useAuth(); // Lấy Mã NV của nhân viên login

  const MaNVCurrent = Number(user?.id); // đảm bảo là số

  // ------------------------------------
  // STATE QUẢN LÝ DỮ LIỆU
  // ------------------------------------
  const [allOrders, setAllOrders] = useState<OrderRecord[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // ------------------------------------
  // STATE POPUPS
  // ------------------------------------
  const [detailTarget, setDetailTarget] = useState<OrderRecord | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const [editTarget, setEditTarget] = useState<OrderRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OrderRecord | null>(null);

  // ==================================================================
  // FETCH DATA (API thật → fallback mock)
  // ==================================================================

  const fetchData = useCallback(async () => {
    try {
      const data = await getAllOrders();
      setAllOrders(data);
    } catch (err) {
      console.error("API lỗi, dùng mock:", err);
      setAllOrders(MOCK_ORDERS);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==================================================================
  // FILTER → CHỈ LẤY ĐƠN CỦA NHÂN VIÊN ĐANG LOGIN
  // ==================================================================

  const { orders, totalPages } = useMemo(() => {
    let filtered = [...allOrders];

    // ✨ ✨ ✨ Chỉ giữ đơn hàng do nhân viên này lập
    filtered = filtered.filter((o) => o.MaNV === MaNVCurrent);

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (o) =>
          String(o.MaDH).includes(search) || String(o.MaKH).includes(search)
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

    return {
      orders: filtered.slice(start, end),
      totalPages: calculatedTotalPages || 1,
    };
  }, [allOrders, search, sort, page, MaNVCurrent]);

  // Nếu trang vượt quá tổng trang → kéo về trang cuối
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // ==================================================================
  // HANDLERS
  // ==================================================================

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  // VIEW DETAIL - API thật → mock nếu lỗi
  const openDetailPopup = async (order: OrderRecord) => {
    setDetailTarget(order);
    setOrderDetails([]);

    try {
      const details = await getOrderDetails(order.MaDH);
      setOrderDetails(details);
    } catch (err) {
      console.error("API lỗi chi tiết, dùng mock:", err);
      setOrderDetails(getMockDetails(order.MaDH));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const ok = await deleteOrder(deleteTarget.MaDH);
      if (ok) {
        setAllOrders((prev) =>
          prev.filter((x) => x.MaDH !== deleteTarget.MaDH)
        );
        setDeleteTarget(null);
      } else {
        alert("Xóa thất bại.");
      }
    } catch (err) {
      alert("Không xóa được. Kiểm tra kết nối.");
    }
  };

  // ==================================================================
  // RENDER
  // ==================================================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-[#537B24] mb-4">
        Đơn hàng của tôi
      </h2>

      {/* SEARCH + SORT */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm theo Mã ĐH hoặc Mã KH..."
            className="border rounded px-4 py-2 w-80 shadow-sm"
            value={search}
            onChange={handleSearchChange}
          />

          <select
            className="border px-3 py-2 rounded shadow-sm"
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
          <thead className="bg-[#A7D388] text-[#537B24] font-semibold">
            <tr>
              <th className="p-3">Mã ĐH</th>
              <th className="p-3">Mã KH</th>
              <th className="p-3">Ngày lập</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Không có đơn nào do bạn lập.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.MaDH} className="border-b hover:bg-gray-50">
                  <td className="p-3">{o.MaDH}</td>
                  <td className="p-3">{o.MaKH}</td>
                  <td className="p-3">{o.NgayLap}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    {o.TongTien.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => openDetailPopup(o)}
                      >
                        Xem
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => setEditTarget(o)}
                      >
                        Sửa
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
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
            className="px-4 py-2 border rounded"
          >
            ←
          </button>

          <span>
            Trang <b>{page}</b> / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded"
          >
            →
          </button>
        </div>
      )}

      {/* POPUPS */}
      {detailTarget && (
        <OrderDetailPopup
          data={{ record: detailTarget, detail: orderDetails }}
          onClose={() => setDetailTarget(null)}
        />
      )}

      {editTarget && (
        <OrderEditPopup
          order={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={fetchData}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Xác nhận xóa
            </h2>
            <p className="mb-4">
              Bạn có chắc muốn xóa đơn{" "}
              <b className="text-red-600">#{deleteTarget.MaDH}</b>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteTarget(null)}
              >
                Hủy
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDeleteConfirm}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
