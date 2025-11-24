import { useState } from "react";

export default function ThongKeTester() {
  const [result, setResult] = useState<any>(null);
  const [type, setType] = useState<string>("thang");

  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2025);

  const [start, setStart] = useState("2025-11-01");
  const [end, setEnd] = useState("2025-11-20");

  const [date, setDate] = useState("2025-11-24");
  const [maNV, setMaNV] = useState(1);

  const BASE_URL = "http://localhost:8080";

  const callApi = async () => {
    let url = "";

    switch (type) {
      case "thang":
        url = `/api/thong-ke/thang?month=${month}&year=${year}`;
        break;
      case "khoang":
        url = `/api/thong-ke/khoang-ngay?start=${start}&end=${end}`;
        break;
      case "ngay":
        url = `/api/thong-ke/ngay?date=${date}`;
        break;
      case "nhanvien":
        url = `/api/thong-ke/nhan-vien?maNV=${maNV}`;
        break;
    }

    try {
      const res = await fetch(BASE_URL + url);
      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        setResult({ error: true, message: text });
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Lỗi gọi API" });
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Kiểm tra API Thống Kê</h1>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="thang">Thống kê theo tháng</option>
        <option value="khoang">Thống kê theo khoảng ngày</option>
        <option value="ngay">Thống kê theo ngày</option>
        <option value="nhanvien">Thống kê theo nhân viên</option>
      </select>

      {type === "thang" && (
        <div className="space-y-2">
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            placeholder="Tháng"
          />
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            placeholder="Năm"
          />
        </div>
      )}

      {type === "khoang" && (
        <div className="space-y-2">
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      )}

      {type === "ngay" && (
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      )}

      {type === "nhanvien" && (
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={maNV}
          onChange={(e) => setMaNV(Number(e.target.value))}
        />
      )}

      <button
        onClick={callApi}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Gọi API
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
