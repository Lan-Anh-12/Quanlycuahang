package example.com.Controller.quanly;

import example.com.Service.order.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/thong-ke")
@CrossOrigin(origins = "http://localhost:5173")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    //  Thống kê theo tháng 
    @GetMapping("/thang")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public Map<String, Object> thongKeTheoThang(
            @RequestParam int month,
            @RequestParam int year
    ) {
        return thongKeService.thongKeTheoThang(month, year);
    }
    

    // thống kê sản phẩm theo tháng
    @GetMapping("/sanpham")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<Map<String, Object>> sanPhamBanTheoThang(@RequestParam int thang,@RequestParam int nam ) {
        return thongKeService.sanPhamBanChayTheoThang(thang, nam);
    }
}
