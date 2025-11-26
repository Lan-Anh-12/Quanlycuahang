import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
import type { ReactNode } from "react";

/**
 * Kiểu user (bạn có thể mở rộng thêm trường id/email... theo API)
 */
type User = {
  id?: number;
  name: string;
  email?: string;
};

/**
 * Kiểu dữ liệu trả về khi login (phù hợp với backend mẫu: { user, token })
 */
type LoginResponse = {
  user: User;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

/**
 * Khai báo context với generic type
 * - dùng `undefined` thay vì `null` để khi useContext trả về undefined nếu không có Provider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  // định nghĩa rõ kiểu cho user
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Nếu authService chưa có type chính xác, ta cast tạm
      const data = (await authService.login(
        email,
        password
      )) as unknown as LoginResponse;

      // đảm bảo data có cấu trúc đúng trước khi set
      if (data && data.user) {
        setUser(data.user);
      } else {
        // nếu backend trả lỗi, bạn có thể ném error để component bắt
        throw new Error("Invalid login response");
      }

      if (data && data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      // bạn có thể xử lý lỗi ở đây (toast/log) hoặc rethrow để component bọc bắt
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook tiện lợi để lấy auth context, kèm kiểm tra provider
 */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
