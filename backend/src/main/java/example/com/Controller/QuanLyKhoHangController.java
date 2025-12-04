package example.com.Controller;

import example.com.Service.inventory.InventoryService;
import example.com.Dto.sanpham.SanPhamRequest;
import example.com.Dto.sanpham.SanPhamResponse;
import example.com.Dto.khohang.NhapKhoResponse;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
@RestController
@RequestMapping("quanly/khohang")

public class QuanLyKhoHangController {
    @Autowired
    private InventoryService inventoryService;

    // tạo sản phẩm mới
    @PostMapping("/taosp")
    public ResponseEntity<SanPhamResponse> taoSanPham(@RequestBody SanPhamRequest sp) {
        return new ResponseEntity<>(inventoryService.taoSanPhamMoi(sp), HttpStatus.CREATED);
    }
    // cập nhật sản phẩm
    @PutMapping("/suasp/{maSP}")
    public ResponseEntity<SanPhamResponse> capNhatSanPham(@PathVariable String maSP, @RequestBody SanPhamRequest spReq) {
        SanPhamResponse updatedSp = inventoryService.capNhatSanPham(maSP, spReq);
        return ResponseEntity.ok(updatedSp);
    }
    // lấy tất cả đơn nhập hàng
    @GetMapping("/donnhaphang/tatca")  
    public ResponseEntity<List<NhapKhoResponse>> layTatCaDonNhapHang() {
        List<NhapKhoResponse> list = inventoryService.layTatCaPhieuNhap();
        return ResponseEntity.ok(list);
    }
    // lấy đơn nhập hàng theo mã nhập hoặc nhà cung cấp
    @GetMapping("/donnhaphang/timkiem")  
    public ResponseEntity<List<NhapKhoResponse>> layDonNhapHangTheoMaNKOrNCC(@RequestParam String keyword) {
        List<NhapKhoResponse> list = inventoryService.layTheoMaNKOrNCC(keyword);
        return ResponseEntity.ok(list);
    }

    // lấy 1 đơn nhập hàng theo mã
    @GetMapping("/donnhaphang/{maNK}")
    public ResponseEntity<NhapKhoResponse> layDonNhapHangTheoMa(@PathVariable String maNK) {
        NhapKhoResponse phieuNhap = inventoryService.layPhieuNhapTheoMa(maNK);
        return ResponseEntity.ok(phieuNhap);
    }

    // lấy sản phẩm còn bán
    @GetMapping("/sanpham/conban")  
    public ResponseEntity<List<SanPhamResponse>> sanPhamConBan() {
        List<SanPhamResponse> list = inventoryService.sanPhamConBan();
        return ResponseEntity.ok(list);
    }
    // lấy sản phẩm theo tên
    @GetMapping("/sanpham/timkiem")
    public ResponseEntity<List<SanPhamResponse>> searchSanPham(@RequestParam String phanLoai) {
        List<SanPhamResponse> list = inventoryService.searchSanPham(phanLoai);
        return ResponseEntity.ok(list);
    }
     // Kiểm tra số lượng sản phẩm theo tên
    @GetMapping("/soluong") 
    public ResponseEntity<Integer> xemSoLuongSanPham(@RequestParam String keyword) {
        int count = inventoryService.kiemTraSoLuongSpTheoTen(keyword);
        return ResponseEntity.ok(count);
    }
    // Lấy danh sách sản phẩm còn bán
    @GetMapping("/sanpham")
    public ResponseEntity<List<SanPhamResponse>> timSanPhamConBan() {
        List<SanPhamResponse> list = inventoryService.sanPhamConBan();
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }
    // Tìm sản phẩm theo phân loại hoặc tên
    @GetMapping("/phanloai")
    public ResponseEntity<List<SanPhamResponse>> timSanPham(@RequestParam String phanLoai) {
        List<SanPhamResponse> list = inventoryService.searchSanPham(phanLoai);
        if(list.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }
}
