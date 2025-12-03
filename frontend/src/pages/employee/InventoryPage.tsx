import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";

// ===== Định nghĩa interface Product =====
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  // thêm các trường khác nếu cần
}

export default function InventoryPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const fetchData = async () => {
    try {
      const res = await getProducts(page, 12, search, sort);
      setProducts(res.items);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sort, search]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* === TOP BAR === */}
      <div className="flex justify-between items-center mb-6">
        {/* LEFT: search + sort */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="border rounded px-3 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-[#537B24] text-white px-4 py-2 rounded hover:bg-[#44651d]"
          >
            Tìm kiếm
          </button>

          <select
            className="border px-3 py-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sắp xếp</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      {/* === PRODUCT LIST === */}
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-3">
            <img
              src={p.image}
              alt={p.name}
              className="h-44 w-full object-cover rounded"
            />

            <h3 className="font-semibold mt-3">{p.name}</h3>
            <p className="text-[#537B24] font-bold mt-1">
              {p.price.toLocaleString()} đ
            </p>

            {/* Nút xem chi tiết */}
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-[#537B24] text-white py-2 rounded hover:bg-[#44651d]"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                Xem
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === PAGINATION === */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Trang <b>{page}</b> / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
