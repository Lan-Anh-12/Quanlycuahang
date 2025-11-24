package example.com.Controller.quanly;

import example.com.Service.order.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/thong-ke")
@CrossOrigin(origins = "http://localhost:5173")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    //  Thống kê theo tháng 
    @GetMapping("/thang")
    public Map<String, Object> thongKeTheoThang(
            @RequestParam int month,
            @RequestParam int year
    ) {
        return thongKeService.thongKeTheoThang(month, year);
    }

    //  Thống kê theo khoảng ngày 
    @GetMapping("/khoang-ngay")
    public Map<String, Object> thongKeTheoKhoangNgay(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end
    ) {
        return thongKeService.thongKeTheoKhoangNgay(start, end);
    }

    // Thống kê theo nhân viên 
    @GetMapping("/nhan-vien")
    public Map<String, Object> thongKeTheoNhanVien(@RequestParam int maNV) {
        return thongKeService.thongKeTheoNhanVien(maNV);
    }

    //  Thống kê theo ngày
    @GetMapping("/ngay")
    public Map<String, Object> thongKeTheoNgay(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
    ) {
        return thongKeService.thongKeTheoNgay(date);
    }
}
