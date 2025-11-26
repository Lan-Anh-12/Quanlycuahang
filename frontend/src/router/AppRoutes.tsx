import { Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Pages
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
// import CartPage from "../pages/CartPage";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout người dùng */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sanpham" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* <Route path="cart" element={<CartPage />} /> */}
      </Route>

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
