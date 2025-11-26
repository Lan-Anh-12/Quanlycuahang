import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPopup from "../common/LoginPopup";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
            <i className="fa-solid fa-house text-[#537B24]"></i>
          </button>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[#537B24]"></i>
              <span>contact@demo.com</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-[#537B24]"></i>
              <span>0123.456.789</span>
            </div>

            <div className="flex gap-3 text-lg">
              <i className="fa-brands fa-facebook text-[#537B24]"></i>
              <i className="fa-brands fa-youtube text-[#537B24]"></i>
            </div>

            {/* LOGIN / LOGOUT */}
            <div className="ml-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Xin chào, {user.name}</span>

                  <button
                    onClick={logout}
                    className="bg-[#537B24] px-3 py-1 rounded text-white hover:bg-[#44651d]"
                  >
                    Đăng xuất
                  </button>
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
          {/* Header của sidebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#537B24]">
            <img src="/logo.png" alt="logo" className="h-10" />
            <button onClick={() => setOpen(false)}>
              <IoClose size={28} />
            </button>
          </div>

          {/* MENU LIST */}
          <nav className="mt-2">
            {[
              { label: "TRANG CHỦ", link: "/" },
              { label: "Sản Phẩm", link: "/sanpham" },
              { label: "Khách Hàng", link: "/khachhang" },
              { label: "Nhập Kho", link: "/nhapkho" },
              { label: "Nhân Viên", link: "/nhanvien" },
              { label: "Thống Kê", link: "/thongke" },
              { label: "TÚI RÚT", link: "/tui-rut" },
              { label: "TÚI VẢI XUẤT KHẨU", link: "/tui-xuat-khau" },
              { label: "TÚI VẢI ÉP NHIỆT", link: "/tui-ep-nhiet" },
              { label: "CUNG CẤP VẢI KHÔNG DỆT", link: "/vai-khong-det" },
              { label: "TIN TỨC", link: "/tin-tuc" },
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

      {/* === POPUP LOGIN === */}
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}
