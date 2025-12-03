package example.com.Controller.nhanvien;


import org.springframework.web.bind.annotation.*;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Service.order.DonHangService;
import example.com.model.DonHang;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhanvien/donhang")
public class NhanVienDonHangController {

    @Autowired
    private DonHangService donHangService;

    @PostMapping("/tao")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public DonHangResponse taoDonHang(@RequestBody DonHangRequest req) {
    return donHangService.TaoDonHang(req.getDonHang(), req.getChiTietDonHangs());
}

    @GetMapping("/nhanvien")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public List<DonHang> LayDonHangNhanVienLap(@RequestParam int maNV) {
        return donHangService.XemDonHangNVLap(maNV);
    }
    @GetMapping("/khachhang")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public List<DonHang> LayDonHang_KH(@RequestParam int maKH) {
        return donHangService.LayDonHangTheoKhachHang(maKH);
    }
}
