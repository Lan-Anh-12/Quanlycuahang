package example.com.Controller.nhanvien;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Dto.khachhang.KhachHangResponse;
import example.com.Service.order.DonHangService;
import example.com.model.DonHang;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhanvien/donhang")
public class NhanVienDonHangController {

    @Autowired
    private DonHangService donHangService;

    // Tạo đơn hàng
    @PostMapping
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<DonHangResponse> taoDonHang(@RequestBody DonHangRequest req) {
        DonHangResponse response = donHangService.TaoDonHang(req);
        return ResponseEntity.ok(response);
    }

    // Lấy đơn hàng nhân viên lập
    @GetMapping("/nhanvien")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<List<DonHangResponse>> layDonHangNhanVien(@RequestParam String maNV) {
        List<DonHangResponse> list = donHangService.XemDonHangNVLap(maNV);
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }

    // Lấy đơn hàng theo khách hàng
    @GetMapping("/khachhang")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<List<DonHangResponse>> layDonHangKhachHang(@RequestParam String maKH) {
        List<DonHangResponse> list = donHangService.LayDonHangTheoKhachHang(maKH);
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }

    
}
