import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AddProductPopup from "../components/common/AddProductPopup";

interface Product {
  id: string; // chắc chắn là string
  name: string;
  price?: number;
  image?: string;
  xuatXu?: string;
  moTaNgan?: string;
  huongDan?: string;
  phanLoai?: string;
}

export default function ProductPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let list: Product[] = [];
      const baseURL = "http://localhost:8080/quanly/khohang";

      if (search.trim() !== "") {
        const res = await api.get(`${baseURL}/sanpham/timkiem`, {
          params: { phanLoai: search },
        });
        list = (res.data || []).map((p: any) => ({
          id: p.maSP, // đảm bảo string
          name: p.tenSP,
          price: p.donGia ? Number(p.donGia) : 0,
          image: p.url ?? "/placeholder.png",
          xuatXu: p.xuatXu ?? "",
          moTaNgan: p.moTaNgan ?? p.moTa ?? "",
          huongDan: p.huongDan ?? "",
          phanLoai: p.phanLoai ?? "",
        }));
      } else {
        const res = await api.get(`${baseURL}/sanpham/conban`);
        list = (res.data || []).map((p: any) => ({
          id: p.maSP,
          name: p.tenSP,
          price: p.donGia ? Number(p.donGia) : 0,
          image: p.url ?? "/placeholder.png",
          xuatXu: p.xuatXu ?? "",
          moTaNgan: p.moTaNgan ?? p.moTa ?? "",
          huongDan: p.huongDan ?? "",
          phanLoai: p.phanLoai ?? "",
        }));
      }

      if (sort === "priceAsc") list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      if (sort === "priceDesc") list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

      setProducts(list);
    } catch (err) {
      console.error("Lỗi fetch sản phẩm:", err);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, sort]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(
        `http://localhost:8080/quanly/khohang/suasp/${deleteTarget.id}`
      );
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Tìm sản phẩm theo phân loại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", width: 250 }}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "8px" }}>
            <option value="">Sắp xếp</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
          </select>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          style={{
            backgroundColor: "#537B24",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          + Thêm mới
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>}
      {!loading && products.length === 0 && <p style={{ textAlign: "center" }}>Không có sản phẩm nào.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }}
            />
            <h3 style={{ margin: "10px 0" }}>{p.name}</h3>
            <p style={{ color: "#537B24", fontWeight: "bold" }}>
              {(p.price ?? 0).toLocaleString("vi-VN")} đ
            </p>
            <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
              <button
                style={{
                  flex: 1,
                  backgroundColor: "#537B24",
                  color: "#fff",
                  border: "none",
                  padding: 6,
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/products/${p.id}`)}
              >
                Xem
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: 6,
                  cursor: "pointer",
                }}
                onClick={() => setDeleteTarget(p)}
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <AddProductPopup
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            fetchData();
            setShowPopup(false);
          }}
        />
      )}

      {deleteTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8, width: 400, position: "relative" }}>
            <button
              onClick={() => setDeleteTarget(null)}
              style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
            >
              ✖
            </button>
            <h2>
              Xóa sản phẩm <span style={{ color: "red" }}>{deleteTarget.name}</span>?
            </h2>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: 6, cursor: "pointer" }}>
                Huỷ
              </button>
              <button
                onClick={handleDelete}
                style={{ padding: 6, backgroundColor: "red", color: "#fff", cursor: "pointer" }}
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
