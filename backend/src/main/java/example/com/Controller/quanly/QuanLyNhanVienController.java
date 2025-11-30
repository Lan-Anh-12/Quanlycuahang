package example.com.Controller.quanly;

import example.com.Service.auth.LoginHistoryService;
import example.com.model.Lichsudangnhap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/login-history")
public class QuanLyNhanVienController {

    @Autowired
    private LoginHistoryService loginHistoryService;

    // Tạo lịch sử đăng nhập
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('QuanLy','NhanVien')")
    public Lichsudangnhap taoLichSu(@RequestBody Lichsudangnhap lichsu) {
        return loginHistoryService.TaoLichSuDangNhap(lichsu);
    }

    // Lấy lịch sử theo IP
    @GetMapping("/by-ip")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<Lichsudangnhap> layLichSuTheoIp(@RequestParam String ip) {
        return loginHistoryService.LayLichSuTheoIp(ip);
    }
}
