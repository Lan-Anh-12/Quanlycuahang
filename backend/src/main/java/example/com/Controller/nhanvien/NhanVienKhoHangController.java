package example.com.Controller.nhanvien;
import org.springframework.web.bind.annotation.*;

import example.com.Service.inventory.InventoryService;
import example.com.model.NhapKho;
import example.com.model.SanPham;
import example.com.Dto.sanpham.SanPhamRequest;
import example.com.Dto.sanpham.SanPhamResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.time.LocalDateTime;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhanvien/khohang")
public class NhanVienKhoHangController {
    @Autowired
    private InventoryService inventoryService;

    // Kiểm tra số lượng sản phẩm theo tên
    @GetMapping("/soluong") 
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<Integer> xemSoLuongSanPham(@RequestParam String keyword) {
        int count = inventoryService.kiemTraSoLuongSpTheoTen(keyword);
        return ResponseEntity.ok(count);
    }
    // Lấy danh sách sản phẩm còn bán
    @GetMapping("/sanpham")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<List<SanPhamResponse>> timSanPhamConBan() {
        List<SanPhamResponse> list = inventoryService.sanPhamConBan();
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }
    // Tìm sản phẩm theo phân loại hoặc tên
    @GetMapping("/phanloai")
    @PreAuthorize("hasAnyRole('NhanVien')")
    public ResponseEntity<List<SanPhamResponse>> timSanPham(@RequestParam String phanLoai) {
        List<SanPhamResponse> list = inventoryService.searchSanPham(phanLoai);
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }

}

