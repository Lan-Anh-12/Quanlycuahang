package example.com.Controller.nhanvien;
import org.springframework.web.bind.annotation.*;

import example.com.Service.inventory.InventoryService;
import example.com.model.NhapKho;
import example.com.model.SanPham;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.time.LocalDateTime;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("nhanvien/khohang")
public class NhanVienKhoHangController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/soluong") 
    @PreAuthorize("hasAnyRole('NhanVien')")
    public int xemSoLuongSanPham(@RequestParam String keyword) {
        return inventoryService.kiemTraSoLuongSpTheoTen(keyword);
    }
    @GetMapping("/sanpham")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public List<SanPham> timSanPhamConBan() {
        return inventoryService.sanPhamConBan();
    }
    @GetMapping("/phanloai")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public List<SanPham> phanLoaiSanPham(String phanLoai) {
        return inventoryService.sanPhamTheoLoai(phanLoai);
    }
    
}
