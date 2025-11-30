package example.com.Controller.nhanvien;
import org.springframework.web.bind.annotation.*;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Service.customer.KhachHangService;
import example.com.model.KhachHang;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.time.LocalDateTime;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhanvien/khachhang")
public class NhanVienKhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @PostMapping("/tao")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public KhachHang taoKhachHangMoi(@RequestBody KhachHang kh) {
        return khachHangService.taoKhachHang(kh);
    } 
    
    @GetMapping("/laykh") 
    @PreAuthorize("hasAnyRole('NhanVien')")
    public KhachHang layKhachHangThMa(@RequestParam int maKH) {
        return khachHangService.layKhachHangTheoMa(maKH);

    }
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public List<KhachHang> layallKhach() {
        return khachHangService.layTatCaKhachHang();
    }

    
}