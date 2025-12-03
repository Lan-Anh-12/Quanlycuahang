package example.com.Controller.quanly;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Dto.donhang.ChiTietDonHangRequest;
import example.com.Dto.donhang.ChiTietDonHangResponse;
import example.com.Dto.donhang.CapNhatDonHangRequest;
import example.com.Service.order.DonHangService;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/quanly/donhang")
public class QuanLyDonHangController {

    @Autowired
    private DonHangService donHangService;

    // Lấy đơn hàng theo khách hàng
    @GetMapping("/khachhang/{maKH}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<List<DonHangResponse>> layDonHangTheoKhachHang(@PathVariable String maKH) {
        List<DonHangResponse> donHangs = donHangService.LayDonHangTheoKhachHang(maKH);
        if (donHangs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(donHangs);
    }

    // Lấy đơn hàng theo nhân viên lập
    @GetMapping("/nhanvien/{maNV}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<List<DonHangResponse>> layDonHangNhanVien(@PathVariable String maNV) {
        List<DonHangResponse> donHangs = donHangService.XemDonHangNVLap(maNV);
        if (donHangs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(donHangs);
    }

    // Lấy chi tiết đơn hàng theo mã đơn
    @GetMapping("/chitiet/{maDH}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<List<ChiTietDonHangResponse>> layChiTietDonHang(@PathVariable String maDH) {
        List<ChiTietDonHangResponse> chiTiets = donHangService.LayChiTietDonHangTheoDonHang(maDH);
        if (chiTiets.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(chiTiets);
    }

    // Lấy đơn hàng theo khoảng ngày
    @GetMapping("/khoangngay")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<List<DonHangResponse>> layDonHangTheoKhoangNgay(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<DonHangResponse> donHangs = donHangService.LayDonHangTheoKhoangNgay(start, end);
        if (donHangs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(donHangs);
    }


    // Cập nhật đơn hàng
    @PutMapping("/capnhat")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<DonHangResponse> capNhatDonHang(@RequestBody CapNhatDonHangRequest req) {
        DonHangResponse updated = donHangService.CapNhatDonHang(req);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }
}
