import { useState } from "react";
import axios from "axios";

export default function LoginTest() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIp] = useState("192.168.1.55");
  const [log, setLog] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
  });

  const test = async () => {
    setLog("Đang login...");

    try {
      // 1) LOGIN
      const loginRes = await api.post("/auth/login", {
        username,
        password,
      });

      setLog((l) => l + "\nLogin thành công!");

      const maTK = loginRes.data.maTK;

      // 2) TẠO LỊCH SỬ
      const lichSuBody = {
        maTK: maTK,
        diaChiIP: ip,
      };

      const createRes = await api.post(
        "/login-history/create",
        lichSuBody,
        {
          headers: { Authorization: `Bearer ${loginRes.data.token}` },
        }
      );

      setLog((l) => l + "\nTạo lịch sử OK: " + JSON.stringify(createRes.data));

      // 3) LẤY LỊCH SỬ THEO IP
      const getRes = await api.get(`/login-history/by-ip?ip=${ip}`, {
        headers: { Authorization: `Bearer ${loginRes.data.token}` },
      });

      setLog((l) => l + "\nLấy lịch sử OK: " + JSON.stringify(getRes.data));
    } catch (err: any) {
      setLog((l) => l + "\nLỖI: " + err.response?.status + " - " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test Login + Lịch Sử</h2>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>

      <button onClick={test}>Test</button>

      <pre>{log}</pre>
    </div>
  );
}
