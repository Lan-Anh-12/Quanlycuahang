package example.com.Controller.quanly;

import org.springframework.web.bind.annotation.*;

import example.com.Dto.TaoDonHangRequest;
import example.com.Service.order.DonHangService;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/quanly/donhang")
public class QuanLyDonHangController {

    @Autowired
    private DonHangService donHangService;

    @PostMapping("/tao")
    public DonHang taoDonHang(@RequestBody TaoDonHangRequest req) {
        return donHangService.TaoDonHang(req.getDonHang(), req.getChiTietDonHangs());
    }
    
    @GetMapping("/khachhang")
    public List<DonHang> LayDonHang_KH(@RequestParam int maKH) {
        return donHangService.LayDonHangTheoKhachHang(maKH);
    }
    @GetMapping("/chitiet")
    public List<CT_DonHang> LayChiTietDonHang_TheoMaDH(@RequestParam int maDH) {
        return donHangService.LayChiTietDonHangTheoDonHang(maDH);
    }
    
}
