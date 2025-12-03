import { useState } from "react";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPopup from "../common/LoginPopup";
import ChangePasswordPopup from "../common/ChangePasswordPopup";

export default function EmployeeHeader() {
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <header className="w-full">
      {/* === TOP BAR === */}
      <div className="bg-[#78AF38] text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Nút mở sidebar */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 font-semibold"
          >
            <i className="fa-solid fa-bars text-[#537B24] text-lg"></i>
          </button>

          {/* Thông tin + Login */}
          <div className="flex items-center gap-6">
            {/* LOGIN / LOGOUT */}
            <div className="ml-4 relative">
              {user ? (
                <div>
                  {/* Tên người dùng */}
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-1 font-semibold hover:opacity-80"
                  >
                    <span>{user.name}</span>
                    <IoChevronDown />
                  </button>

                  {/* Dropdown menu */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border text-black z-50">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setIsChangePassOpen(true);
                          setMenuOpen(false);
                        }}
                      >
                        Đổi mật khẩu
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}

                  {/* Popup đổi mật khẩu */}
                  <ChangePasswordPopup
                    isOpen={isChangePassOpen}
                    onClose={() => setIsChangePassOpen(false)}
                    email={user.email}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-[#537B24] px-3 py-1 rounded text-white hover:bg-[#44651d]"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* === SIDEBAR === */}
      <>
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 z-40 h-full w-64
            bg-[#78AF38] text-white shadow-xl 
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Header Sidebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#537B24]">
            <img src="/logo.png" alt="logo" className="h-10" />
            <button onClick={() => setOpen(false)}>
              <IoClose size={28} />
            </button>
          </div>

          {/* MENU DÀNH CHO NHÂN VIÊN */}
          <nav className="mt-2">
            {[
              { label: "Tạo đơn hàng", link: "/employee/tao-don-hang" },
              { label: "Tồn kho", link: "/employee/ton-kho" },
              { label: "Đơn hàng", link: "/employee/don-hang" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block px-4 py-3 border-b hover:bg-[#537B24] transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </>

      {/* === Popup login === */}
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}
