package example.com.Controller.quanly;

import example.com.model.NhapKho;
import example.com.model.SanPham;
import example.com.Service.inventory.InventoryService;

import org.springframework.web.bind.annotation.*;
import org.aspectj.lang.annotation.After;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("quanly/khohang")

public class QuanLyKhoHangController {
    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/taosp")
    @PreAuthorize("hasAnyRole('QuanLy')")
    public SanPham taoSanPhamMoi(@RequestBody SanPham sp) {
        return inventoryService.taoSanPhamMoi(sp);
    }
}
