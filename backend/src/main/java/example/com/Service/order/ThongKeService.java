package example.com.Service.order;

import java.time.LocalDate;
import java.util.Map;
import java.util.List;

public interface ThongKeService {

    Map<String, Object> thongKeTheoThang(int month, int year);

    Map<String, Object> thongKeTheoKhoangNgay(LocalDate start, LocalDate end);

    Map<String, Object> thongKeTheoNhanVien(int maNV);

    Map<String, Object> thongKeTheoNgay(LocalDate date);

    Map<String, Object> thongKeTheoKhachHang(int maKH);

    List<Map<String, Object>> sanPhamBanChayTheoThang(int thang, int nam );

    
}
