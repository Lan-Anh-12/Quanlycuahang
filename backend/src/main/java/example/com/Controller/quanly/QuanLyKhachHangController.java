package example.com.Controller.quanly;

import example.com.model.KhachHang;
import example.com.Service.customer.KhachHangService;

import org.springframework.web.bind.annotation.*;
import org.aspectj.lang.annotation.After;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("quanly/khachhang")
public class QuanLyKhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @PostMapping("/sua") 
    @PreAuthorize("hasAnyRole('QuanLy')")
    public KhachHang capNhatTTKhachHang(@RequestParam int maKH,@RequestBody KhachHang kh) {
        return khachHangService.capNhatKhachHang(maKH, kh);
    }
}
