// // dashboardService.ts
// import axios from "axios";

// // Định nghĩa kiểu dữ liệu cho phản hồi API (Giữ nguyên)
// export interface WeeklyRevenueItem {
//   day: string;
//   revenue: number;
// }
// export interface CustomerRankingItem {
//   rank: number;
//   name: string;
//   total_spent: number;
// }
// export interface LowStockProduct {
//   name: string;
//   stock: number;
// }
// export interface RevenueByCategoryItem {
//   category: string;
//   revenue_percent: number;
//   revenue_amount: number;
// }

// // ✅ ĐÃ CẬP NHẬT: URL cơ sở bao gồm cổng 8080
// // Giả định Backend đang chạy trên localhost:8080
// const BASE_URL = "http://localhost:8080/api/dashboard";
// const PRODUCTS_URL = "http://localhost:8080/api/products";

// // --- 1. Lấy chỉ số Tổng quan (KPIs) ---

// export const getEmployeeCount = async (): Promise<number> => {
//   const response = await axios.get(`${BASE_URL}/employee-count`);
//   return response.data.count;
// };

// export const getCustomerCount = async (): Promise<number> => {
//   const response = await axios.get(`${BASE_URL}/customer-count`);
//   return response.data.count;
// };

// // --- 2. Lấy dữ liệu Biểu đồ và Bảng xếp hạng ---

// export const getWeeklyRevenue = async (): Promise<WeeklyRevenueItem[]> => {
//   const response = await axios.get<WeeklyRevenueItem[]>(
//     `${BASE_URL}/weekly-revenue`
//   );
//   return response.data;
// };

// export const getTopCustomers = async (
//   limit: number = 5
// ): Promise<CustomerRankingItem[]> => {
//   const response = await axios.get<CustomerRankingItem[]>(
//     `${BASE_URL}/top-customers`,
//     {
//       params: { limit },
//     }
//   );
//   return response.data;
// };

// export const getLowStockProducts = async (
//   limit: number = 5
// ): Promise<LowStockProduct[]> => {
//   // Sử dụng endpoint của Sản phẩm
//   const response = await axios.get<LowStockProduct[]>(
//     `${PRODUCTS_URL}/low-stock`,
//     {
//       params: { limit },
//     }
//   );
//   return response.data;
// };

// export const getRevenueByCategory = async (): Promise<
//   RevenueByCategoryItem[]
// > => {
//   const response = await axios.get<RevenueByCategoryItem[]>(
//     `${BASE_URL}/revenue-by-category`
//   );
//   return response.data;
// };

// dashboardService.ts
// Giả định bạn đặt file này trong thư mục /services
import {
  totalEmployees,
  totalCustomers,
  weeklyRevenueData,
  topCustomersData,
  lowStockProductsData,
  revenueByCategoryData,
} from "../services/mockData"; // Đảm bảo đường dẫn đúng
import type {
  WeeklyRevenueItem,
  CustomerRankingItem,
  LowStockProduct,
  RevenueByCategoryItem,
} from "../services/mockData";

const MOCK_API_DELAY = 500; // Mô phỏng thời gian chờ API (0.5 giây)

// --- 1. Lấy chỉ số Tổng quan (KPIs) ---

export const getEmployeeCount = (): Promise<number> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch('/api/dashboard/employee-count')
    setTimeout(() => resolve(totalEmployees), MOCK_API_DELAY);
  });
};

export const getCustomerCount = (): Promise<number> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch('/api/dashboard/customer-count')
    setTimeout(() => resolve(totalCustomers), MOCK_API_DELAY);
  });
};

// --- 2. Lấy dữ liệu Biểu đồ và Bảng xếp hạng ---

export const getWeeklyRevenue = (): Promise<WeeklyRevenueItem[]> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch('/api/dashboard/weekly-revenue')
    setTimeout(() => resolve(weeklyRevenueData), MOCK_API_DELAY);
  });
};

export const getTopCustomers = (
  limit: number = 5
): Promise<CustomerRankingItem[]> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch(`/api/dashboard/top-customers?limit=${limit}`)
    setTimeout(() => resolve(topCustomersData.slice(0, limit)), MOCK_API_DELAY);
  });
};

export const getLowStockProducts = (
  limit: number = 5
): Promise<LowStockProduct[]> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch(`/api/products/low-stock?limit=${limit}`)
    setTimeout(
      () => resolve(lowStockProductsData.slice(0, limit)),
      MOCK_API_DELAY
    );
  });
};

export const getRevenueByCategory = (): Promise<RevenueByCategoryItem[]> => {
  return new Promise((resolve) => {
    // Thay thế bằng fetch('/api/dashboard/revenue-by-category')
    setTimeout(() => resolve(revenueByCategoryData), MOCK_API_DELAY);
  });
};
