package example.com.Controller.nhanvien;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import example.com.Dto.khachhang.KhachHangResponse;
import example.com.Service.customer.KhachHangService;
import example.com.model.KhachHang;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhanvien/khachhang")
public class NhanVienKhachHangController {

    @Autowired
    private KhachHangService khachHangService;



    // Lấy khách hàng theo mã
     @GetMapping("/{maKH}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<KhachHangResponse> layTheoMa(@PathVariable String maKH) {
        return ResponseEntity.ok(khachHangService.layKhachHangTheoMa(maKH));
    }

    // Lấy tất cả khách hàng
    @GetMapping("/tatca")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<List<KhachHangResponse>> layTatCa() {
        return ResponseEntity.ok(khachHangService.layTatCaKhachHang());
    }

    // Tìm kiếm khách hàng theo tên
    @GetMapping("/tim/ten")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<List<KhachHangResponse>> timTheoTen(
            @RequestParam String ten) {
        return ResponseEntity.ok(khachHangService.searchKhachHang(ten));
    }

    

    
}
