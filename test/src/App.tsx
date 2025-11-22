import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/quanly/donhang";

function App() {
  const [log, setLog] = useState<any>(null);

  // Hàm format ngày: yyyy-MM-dd'T'HH:mm:ss
  const formatLocalDateTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const taoDonHang = async () => {
    const now = new Date();
    const body = {
      donHang: {
        maKH: 1,  // ID khách hàng tồn tại
        maNV: 1,  // ID nhân viên tồn tại
        tongTien: 50000,
        ngayLap: formatLocalDateTime(now),
      },
      chiTietDonHangs: [
        { maSP: 2, soLuong: 2, donGia: 15000, thanhTien: 30000 }, // SP tồn tại
        { maSP: 3, soLuong: 1, donGia: 10000, thanhTien: 10000 },
      ],
    };

    try {
      const res = await axios.post(`${API}/tao`, body);
      setLog(res.data);
    } catch (err: any) {
      console.error("Lỗi tạo đơn hàng:", err.response?.data || err.message);
      setLog({ error: err.response?.data || err.message });
    }
  };

  const layDonHang_KH = async () => {
    try {
      const res = await axios.get(`${API}/khachhang`, { params: { maKH: 1 } });
      setLog(res.data);
    } catch (err: any) {
      console.error("Lỗi lấy đơn hàng theo khách:", err.response?.data || err.message);
      setLog({ error: err.response?.data || err.message });
    }
  };

  const layChiTiet = async () => {
    try {
      const res = await axios.get(`${API}/chitiet`, { params: { maDH: 1 } });
      setLog(res.data);
    } catch (err: any) {
      console.error("Lỗi lấy chi tiết đơn hàng:", err.response?.data || err.message);
      setLog({ error: err.response?.data || err.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test API Đơn Hàng</h2>

      <button onClick={taoDonHang}>Tạo đơn hàng</button>
      <button onClick={layDonHang_KH}>Lấy đơn theo khách hàng</button>
      <button onClick={layChiTiet}>Lấy chi tiết đơn hàng</button>

      <pre>{JSON.stringify(log, null, 2)}</pre>
    </div>
  );
}

export default App;
