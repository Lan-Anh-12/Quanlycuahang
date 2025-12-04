// services/dashboardApi.ts
import api from "./api";
import type {
  WeeklyRevenueItem,
  CustomerRankingItem,
  LowStockProduct,
  RevenueByCategoryItem,
} from "./mockData";

const BASE_URL = "http://localhost:8080/api/dashboard";
const PRODUCTS_URL = "http://localhost:8080/api/products";

export const getEmployeeCount = async (): Promise<number> => {
  const res = await api.get(`${BASE_URL}/employee-count`);
  return res.data.count;
};

export const getCustomerCount = async (): Promise<number> => {
  const res = await api.get(`${BASE_URL}/customer-count`);
  return res.data.count;
};

export const getWeeklyRevenue = async (): Promise<WeeklyRevenueItem[]> => {
  const res = await api.get(`${BASE_URL}/weekly-revenue`);
  return res.data;
};

export const getTopCustomers = async (
  limit: number = 5
): Promise<CustomerRankingItem[]> => {
  const res = await api.get(`${BASE_URL}/top-customers`, { params: { limit } });
  return res.data;
};

export const getLowStockProducts = async (
  limit: number = 5
): Promise<LowStockProduct[]> => {
  const res = await api.get(`${PRODUCTS_URL}/low-stock`, { params: { limit } });
  return res.data;
};

export const getRevenueByCategory = async (): Promise<RevenueByCategoryItem[]> => {
  const res = await api.get(`${BASE_URL}/revenue-by-category`);
  return res.data;
};
