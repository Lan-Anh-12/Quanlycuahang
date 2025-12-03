package example.com.Controller.quanly;

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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("quanly/khohang")

public class QuanLyKhoHangController {
    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/taosp")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<SanPhamResponse> taoSanPham(@RequestBody SanPhamRequest sp) {
        return new ResponseEntity<>(inventoryService.taoSanPhamMoi(sp), HttpStatus.CREATED);
    }

    @PutMapping("/suasp/{maSP}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<SanPhamResponse> capNhatSanPham(@PathVariable String maSP, @RequestBody SanPhamRequest spReq) {
        SanPhamResponse updatedSp = inventoryService.capNhatSanPham(maSP, spReq);
        return ResponseEntity.ok(updatedSp);
    }
    // lấy tất cả đơn nhập hàng
    @GetMapping("/donnhaphang/tatca")
    @PreAuthorize("hasAnyRole('QuanLy')")   
    public ResponseEntity<List<NhapKhoResponse>> layTatCaDonNhapHang() {
        List<NhapKhoResponse> list = inventoryService.layTatCaPhieuNhap();
        return ResponseEntity.ok(list);
    }
    // lấy đơn nhập hàng theo mã nhập hoặc nhà cung cấp
    @GetMapping("/donnhaphang/timkiem")
    @PreAuthorize("hasAnyRole('QuanLy')")   
    public ResponseEntity<List<NhapKhoResponse>> layDonNhapHangTheoMaNKOrNCC(@RequestParam String keyword) {
        List<NhapKhoResponse> list = inventoryService.layTheoMaNKOrNCC(keyword);
        return ResponseEntity.ok(list);
    }

    // lấy 1 đơn nhập hàng theo mã
    @GetMapping("/donnhaphang/{maNK}")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public ResponseEntity<NhapKhoResponse> layDonNhapHangTheoMa(@PathVariable String maNK) {
        NhapKhoResponse phieuNhap = inventoryService.layPhieuNhapTheoMa(maNK);
        return ResponseEntity.ok(phieuNhap);
    }

}
