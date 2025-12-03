import { Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

// Admin Pages
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
import CustomerManagement from "../pages/CustomerManagement";
import EmployeeManagement from "../pages/EmployeeManagement";
import OrderManagement from "../pages/OrderManagement";
import ImportManagement from "../pages/ImportPage";

// Employee Pages
import InventoryPage from "../pages/employee/InventoryPage";
import CreateOrderPage from "../pages/employee/CreateOrderPage";
import OrderPageEmployee from "../pages/employee/OrderPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sanpham" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="khachhang" element={<CustomerManagement />} />
        <Route path="nhanvien" element={<EmployeeManagement />} />
        <Route path="donhang" element={<OrderManagement />} />
        <Route path="nhapkho" element={<ImportManagement />} />
      </Route>

      {/* EMPLOYEE ROUTES */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="ton-kho" element={<InventoryPage />} />
        <Route path="tao-don-hang" element={<CreateOrderPage />} />
        <Route path="don-hang" element={<OrderPageEmployee />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
