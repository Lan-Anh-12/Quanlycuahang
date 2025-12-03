import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

import EditProductPopup from "../components/common/EditProductPopup";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(Number(id));
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product)
    return <p className="p-6 text-gray-600">Đang tải dữ liệu sản phẩm...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Chi tiết sản phẩm #{product.id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ảnh sản phẩm */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] object-cover rounded-xl shadow"
          />
        </div>

        {/* Thông tin */}
        <div className="bg-white p-5 rounded-xl shadow space-y-3 text-gray-700">
          <p>
            <strong>Tên sản phẩm:</strong> {product.name}
          </p>
          <p>
            <strong>Giá:</strong> {product.price.toLocaleString()} đ
          </p>
          <p>
            <strong>Xuất xứ:</strong> {product.xuatXu}
          </p>
          <p>
            <strong>Mô tả ngắn:</strong> {product.moTaNgan}
          </p>
          <p>
            <strong>Hướng dẫn sử dụng:</strong> {product.huongDan}
          </p>
          <p>
            <strong>Phân loại:</strong> {product.phanLoai}
          </p>
        </div>
      </div>

      {/* Nút sửa */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setShowPopup(true)}
          className="px-5 py-2 bg-[#537B24] text-white rounded-lg hover:bg-[#44651d]"
        >
          Sửa sản phẩm
        </button>
      </div>

      {showPopup && (
        <EditProductPopup
          product={product}
          onClose={() => setShowPopup(false)}
          onSave={(updated) => {
            setProduct(updated);
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}
