package example.com.Controller.quanly;

import org.springframework.web.bind.annotation.*;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Service.order.DonHangService;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/quanly/donhang")
public class QuanLyDonHangController {

    @Autowired
    private DonHangService donHangService;

    
    
    @GetMapping("/khachhang")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<DonHang> LayDonHang_KH(@RequestParam int maKH) {
        return donHangService.LayDonHangTheoKhachHang(maKH);
    }

    @GetMapping("/chitiet")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<CT_DonHang> LayChiTietDonHang_TheoMaDH(@RequestParam int maDH) {
        return donHangService.LayChiTietDonHangTheoDonHang(maDH);
    }

    @GetMapping("/nhanvien")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<DonHang> LayDonHangNhanVienLap(@RequestParam int maNV) {
        return donHangService.XemDonHangNVLap(maNV);
    }

    @GetMapping("/khoangngay")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public List<DonHang> LayDonHangTheoKhoangNgay(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end ) {
        return donHangService.LayDonHangTheoKhoangNgay(start, end);
    }
    @GetMapping("/xoa")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public void quanLyXoaDonHang(@RequestParam int maDH) {
        donHangService.XoaDonHang(maDH);
    }
    @GetMapping("/capnhat")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public DonHang capNhatDonHang(@RequestBody DonHangRequest req) {
        return donHangService.CapNhatDonHang(req.getDonHang(), req.getChiTietDonHangs());
    }

    
}
