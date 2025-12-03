import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// =========================
// GET PRODUCTS (với search, sort, pagination)
// =========================
export const getProducts = async (
  page = 1,
  limit = 12,
  search = "",
  sort = ""
): Promise<{ items: any[]; totalPages: number }> => {
  try {
    const res = await axios.get(API_URL, {
      params: { page, size: limit, search, sort },
    });
    // res.data phải là { items: [], totalPages: number } từ backend
    return res.data;
  } catch (error) {
    console.error("Failed to get products:", error);
    return { items: [], totalPages: 0 };
  }
};

// =========================
// LOAD PRODUCTS (dùng cho component)
// =========================
export const loadProducts = async (): Promise<any[]> => {
  try {
    const res = await getProducts(); // page=1, limit=12 mặc định
    return res.items;
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (data: any) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (id: number | string, data: any) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (id: number | string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

// ======================================
// MOCK DATA SẢN PHẨM
// ======================================

// let MOCK_PRODUCTS = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   name: `Sản phẩm số ${i + 1}`,
//   price: Math.floor(Math.random() * 900000) + 100000,
//   image: "https://via.placeholder.com/350x250?text=Product",

//   // --- Thuộc tính thêm ---
//   xuatXu: ["Việt Nam", "Nhật Bản", "Hàn Quốc", "Mỹ"][i % 4],
//   moTaNgan: "Đây là mô tả ngắn của sản phẩm để test UI.",
//   huongDan: "Dùng theo hướng dẫn được in trên bao bì.",
//   phanLoai: ["Cao cấp", "Phổ thông", "Tiêu chuẩn"][i % 3],
// }));

// // ======================================
// // GET LIST (search, sort, paginate)
// // ======================================
// export const getProducts = async (
//   page = 1,
//   limit = 12,
//   search = "",
//   sort = ""
// ): Promise<{ items: any[]; totalPages: number }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let data = [...MOCK_PRODUCTS];

//       if (search.trim()) {
//         data = data.filter((p) =>
//           p.name.toLowerCase().includes(search.toLowerCase())
//         );
//       }

//       if (sort === "priceAsc") data.sort((a, b) => a.price - b.price);
//       if (sort === "priceDesc") data.sort((a, b) => b.price - a.price);

//       const totalPages = Math.ceil(data.length / limit);
//       const start = (page - 1) * limit;
//       const items = data.slice(start, start + limit);

//       resolve({ items, totalPages });
//     }, 300);
//   });
// };

// // ======================================
// // GET PRODUCT BY ID
// // ======================================
// export const getProductById = async (id: number): Promise<any | null> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const product = MOCK_PRODUCTS.find((p) => p.id === id);
//       resolve(product || null);
//     }, 200);
//   });
// };

// // ======================================
// // CREATE PRODUCT
// // ======================================
// export const createProduct = async (newData: any) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newProduct = {
//         id: MOCK_PRODUCTS.length
//           ? MOCK_PRODUCTS[MOCK_PRODUCTS.length - 1].id + 1
//           : 1,
//         ...newData,
//       };
//       MOCK_PRODUCTS.push(newProduct);
//       resolve({ message: "Created successfully", product: newProduct });
//     }, 200);
//   });
// };

// // ======================================
// // UPDATE PRODUCT
// // ======================================
// export const updateProduct = async (id: number, updatedData: any) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
//       if (index === -1) {
//         resolve({ error: "Product not found" });
//         return;
//       }

//       MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...updatedData };

//       resolve({
//         message: "Updated successfully",
//         product: MOCK_PRODUCTS[index],
//       });
//     }, 200);
//   });
// };

// // ======================================
// // DELETE PRODUCT
// // ======================================
// export const deleteProduct = async (id: number) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       MOCK_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.id !== id);
//       resolve({ message: "Deleted successfully" });
//     }, 200);
//   });
// };
