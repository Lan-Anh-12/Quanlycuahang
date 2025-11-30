import React, { useState } from "react";
import api from "./api"; // api.ts interceptor đã thêm token
import axios from "axios";

interface LichSuLogin {
  ip: string;
  thoiGian: string;
  username: string;
}

const QuanLyTest: React.FC = () => {
  const [username, setUsername] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [msg, setMsg] = useState<string[]>([]);

  const appendMsg = (text: string) => setMsg(prev => [...prev, text]);

  const handleTest = async () => {
  const token = localStorage.getItem("token");

  try {
    const lichSu = {
      maTK: 1, // hoặc lấy từ token decode
      thoiGianDangNhap: new Date().toISOString(),
      diaChiIP: "192.168.1.100",
    };

    // Tạo lịch sử đăng nhập
    const res1 = await axios.post(
      "http://localhost:8080/api/login-history/create",
      lichSu,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Tạo lịch sử thành công:", res1.data);

    // Lấy lịch sử theo IP
    const res2 = await axios.get(
      "http://localhost:8080/api/login-history/by-ip",
      {
        params: { ip: "192.168.1.100" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Lịch sử IP:", res2.data);

  } catch (err: any) {
    console.error("Lỗi:", err.response?.data || err);
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>Test chức năng QuanLy</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={matkhau}
        onChange={(e) => setMatkhau(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleTest}>Login & Test API</button>
      <div style={{ marginTop: 20 }}>
        {msg.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default QuanLyTest;
