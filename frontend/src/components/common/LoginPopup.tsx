import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: Props) {
  const { login } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Gọi API backend
      const token = await authService.login(usernameInput, password);

      // Cập nhật AuthContext với username thật
      login({ username: usernameInput }, token);

      // Đóng popup
      onClose();
    } catch (err: any) {
      setError("Sai username hoặc mật khẩu");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <IoClose size={26} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#537B24] mb-4">
          Đăng nhập
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-3 py-2"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
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
