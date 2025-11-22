package example.com.Service.order;

import java.time.LocalDate;
import java.util.Map;

public interface ThongKeService {

    Map<String, Object> thongKeTheoThang(int month, int year);

    Map<String, Object> thongKeTheoKhoangNgay(LocalDate start, LocalDate end);

    Map<String, Object> thongKeTheoNhanVien(int maNV);

    Map<String, Object> thongKeTheoNgay(LocalDate date);
}
