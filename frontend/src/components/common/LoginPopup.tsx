import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ============================
  // MOCK DATA
  // ============================
  const mockUsers = [
    {
      email: "admin@example.com",
      password: "123456",
      user: {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        role: "ADMIN",
      },
      token: "fake-jwt-token-admin-123456",
    },
    {
      email: "staff01@gmail.com",
      password: "123456",
      user: {
        id: 2,
        name: "Nguyễn Văn A",
        email: "staff01@gmail.com",
        role: "STAFF",
      },
      token: "fake-jwt-token-staff-987654",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // SERVER TRẢ VỀ
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Sai email hoặc mật khẩu");
        return;
      }

      login(data.user, data.token);
      onClose();
    } catch (err) {
      // ===============================
      // FALLBACK → MOCK LOGIN
      // ===============================
      console.log("Server không chạy, dùng dữ liệu mock...");

      const found = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        setError("Sai email hoặc mật khẩu (mock)");
        return;
      }

      login(found.user, found.token);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-lg p-6 relative">
        {/* nút close */}
        <button onClick={onClose} className="absolute top-3 right-3">
          <IoClose size={26} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#537B24] mb-4">
          Đăng nhập
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#537B24] text-white rounded py-2 hover:bg-[#44651d]"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
