import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <<< Đã thêm Link để điều hướng
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getEmployeeCount,
  getCustomerCount,
  getWeeklyRevenue,
  getTopCustomers,
  getLowStockProducts,
  getRevenueByCategory,
} from "../services/dashboardService";
import type {
  WeeklyRevenueItem,
  CustomerRankingItem,
  LowStockProduct,
  RevenueByCategoryItem,
} from "../services/mockData";

// --- CÁC HẰNG SỐ MÀU SẮC (Đã chuẩn hóa) ---
const PRIMARY_GREEN = "#2E7D32";
const LIGHT_GREEN_BG = "#E8F5E9";
const LIGHT_BLUE_BG = "#E3F2FD";

// -------------------------------------------------------------------------
// --- 1. Sub-Component: Thẻ KPI (Stat Card) ---
interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
  to: string; // Đường dẫn điều hướng
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, to }) => (
  // Dùng Link để bọc, thêm hiệu ứng hover và block để chiếm hết không gian
  <Link
    to={to}
    className={`p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-2px] block ${color} text-center cursor-pointer`}
  >
    <p className={`text-lg font-semibold text-gray-700`}>{title}</p>
    <h3 className="text-5xl font-extrabold mt-3 text-gray-900">{value}</h3>
  </Link>
);

// -------------------------------------------------------------------------
// --- 2. Sub-Component: Biểu đồ Cột Doanh thu (Bar Chart) ---
interface RevenueChartProps {
  data: WeeklyRevenueItem[];
}
const RevenueBarChart: React.FC<RevenueChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(0)}M`;
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          className="text-sm"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          axisLine={false}
          tickLine={false}
          className="text-sm"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          formatter={(value: number) => [
            `${value.toLocaleString("vi-VN")} VNĐ`,
            "Doanh thu",
          ]}
        />
        <Bar
          dataKey="revenue"
          fill="#4CAF50"
          barSize={35}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// -------------------------------------------------------------------------
// --- 3. Sub-Component: Biểu đồ Tròn Phân bổ Doanh thu (Pie Chart) ---
interface CategoryChartProps {
  data: RevenueByCategoryItem[];
}
const CategoryPieChart: React.FC<CategoryChartProps> = ({ data }) => {
  const COLORS = ["#1976D2", "#4CAF50", "#FFC107", "#FF5722"];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    category,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    if (percent * 100 < 5) return null;

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${category} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <div className="flex justify-center items-center h-[300px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue_percent"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              `${value}% (${props.payload.revenue_amount.toLocaleString(
                "vi-VN"
              )} VNĐ)`,
              props.payload.category,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// -------------------------------------------------------------------------
// --- 4. Sub-Component: Bảng Xếp hạng Khách hàng (Ranking Table) ---
interface RankingTableProps {
  data: CustomerRankingItem[];
}
const CustomerRankingTable: React.FC<RankingTableProps> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hạng
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tên Khách hàng
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tổng chi tiêu
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {data.map((customer) => (
          <tr
            key={customer.rank}
            className={`${
              customer.rank <= 3 ? "bg-yellow-50/50" : "hover:bg-gray-50"
            } transition duration-150`}
          >
            <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
              {customer.rank}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              {customer.name}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
              {customer.total_spent.toLocaleString("vi-VN")} VNĐ
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// -------------------------------------------------------------------------
// --- 5. Sub-Component: Bảng Cảnh báo Tồn kho (Low Stock Table) ---
interface LowStockTableProps {
  data: LowStockProduct[];
}
const LowStockTable: React.FC<LowStockTableProps> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tên Sản phẩm
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tồn kho
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {data.map((product, index) => (
          <tr
            key={index}
            className={`${
              product.stock <= 10 ? "bg-red-50/50" : "hover:bg-gray-50"
            } transition duration-150`}
          >
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
              {product.name}
            </td>
            <td
              className={`px-6 py-3 whitespace-nowrap text-sm text-right font-medium ${
                product.stock <= 10 ? "text-red-700 font-bold" : "text-gray-700"
              }`}
            >
              {product.stock}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// =========================================================================
// ========================== COMPONENT CHÍNH ==============================
// =========================================================================

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState<number | null>(null);
  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [weeklyRevenue, setWeeklyRevenue] = useState<WeeklyRevenueItem[]>([]);
  const [topCustomers, setTopCustomers] = useState<CustomerRankingItem[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>(
    []
  );
  const [revenueByCategory, setRevenueByCategory] = useState<
    RevenueByCategoryItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          empCount,
          custCount,
          weeklyRevData,
          topCustData,
          lowStockData,
          revByCategoryData,
        ] = await Promise.all([
          getEmployeeCount(),
          getCustomerCount(),
          getWeeklyRevenue(),
          getTopCustomers(5),
          getLowStockProducts(5),
          getRevenueByCategory(),
        ]);

        setEmployeeCount(empCount);
        setCustomerCount(custCount);
        setWeeklyRevenue(weeklyRevData);
        setTopCustomers(topCustData);
        setLowStockProducts(lowStockData);
        setRevenueByCategory(revByCategoryData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu dashboard:", err);
        setError("Không thể tải dữ liệu thống kê từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-white min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-700 font-bold bg-white">
        {error}
      </div>
    );
  }

  const categoryChartData = revenueByCategory.map((item) => ({
    ...item,
    value: item.revenue_percent,
  }));

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Tổng quan hoạt động
      </h1>

      {/* 1. HÀNG KPI TỔNG QUAN (2 Thẻ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Thẻ Nhân viên - Dẫn đến trang /nhan-vien */}
        <StatCard
          title="Tổng số Nhân viên"
          value={employeeCount ?? 0}
          color={LIGHT_BLUE_BG}
          to="/nhanvien" // <<< Đã sửa: Đường dẫn đến trang Nhân viên
        />

        {/* Thẻ Khách hàng - Dẫn đến trang /khach-hang */}
        <StatCard
          title="Tổng số Khách hàng"
          value={customerCount ?? 0}
          color={LIGHT_GREEN_BG}
          to="/khachhang" // <<< Đã sửa: Đường dẫn đến trang Khách hàng
        />
      </div>

      {/* 2. HÀNG DOANH THU & TOP KHÁCH HÀNG (Layout 2/3 và 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Biểu đồ Cột Doanh thu (2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <span className={`text-2xl mr-2 text-[${PRIMARY_GREEN}]`}>📈</span>
            Doanh thu 7 ngày gần nhất
          </h2>
          {weeklyRevenue.length > 0 && <RevenueBarChart data={weeklyRevenue} />}
        </div>

        {/* Top Khách hàng (1/3) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="text-2xl mr-2 text-yellow-500">🏆</span>
            Top 5 Khách hàng
          </h2>
          {topCustomers.length > 0 && (
            <CustomerRankingTable data={topCustomers} />
          )}
        </div>
      </div>

      {/* 3. HÀNG CẢNH BÁO & PHÂN BỔ (Layout 1/2 và 1/2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cảnh báo Sản phẩm sắp hết hàng */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <span className={`text-2xl mr-2 text-red-600`}>⚠️</span>
            Cảnh báo: Sản phẩm sắp hết hàng
          </h2>
          {lowStockProducts.length > 0 && (
            <LowStockTable data={lowStockProducts} />
          )}
        </div>

        {/* Phân bổ Doanh thu theo Phân loại */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <span className={`text-2xl mr-2 text-[${PRIMARY_GREEN}]`}>📊</span>
            Phân bổ Doanh thu theo Phân loại
          </h2>
          {categoryChartData.length > 0 && (
            <CategoryPieChart data={categoryChartData} />
          )}
        </div>
      </div>
    </div>
  );
}
