package example.com.Service.order;

import example.com.Repository.DonHangRepository;
import example.com.Repository.ChiTietDonHangRepository;
import example.com.Repository.SanPhamRepository;
import example.com.Repository.KhachHangRepository;
import example.com.model.DonHang;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository ctDonRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;

    @Autowired
    private KhachHangRepository khRepo;

   
    // Thống kê theo tháng
    
    @Override
    public Map<String, Object> thongKeTheoThang(int month, int year) {

        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);

        List<DonHang> donTrongThang = donHangRepo.findByngayLapBetween(start, end);

        long soDon = donTrongThang.size();

        // tính doanh thu
        var doanhThu = donHangRepo.doanhThuTheoThang(month);

        Map<String, Object> result = new HashMap<>();
        result.put("soDon", soDon);
        result.put("doanhThu", doanhThu);
        result.put("donHang", donTrongThang);

        return result;
    }

   
    // Thống kê theo khoảng ngày
    
    @Override
    public Map<String, Object> thongKeTheoKhoangNgay(LocalDate start, LocalDate end) {

        LocalDateTime s = start.atStartOfDay();
        LocalDateTime e = end.atTime(LocalTime.MAX);

        List<DonHang> dons = donHangRepo.findByngayLapBetween(s, e);

        Map<String, Object> result = new HashMap<>();
        result.put("tongDon", dons.size());
        result.put("danhSach", dons);

        // doanh thu tính bằng code
        double doanhThu = dons.stream()
                .map(d -> d.getTongTien().doubleValue())
                .reduce(0.0, Double::sum);

        result.put("doanhThu", doanhThu);

        return result;
    }

   
    // Thống kê theo nhân viên
   
    @Override
    public Map<String, Object> thongKeTheoNhanVien(int maNV) {

        List<DonHang> dons = donHangRepo.findByMaNV(maNV);

        double doanhThu = dons.stream()
                .map(d -> d.getTongTien().doubleValue())
                .reduce(0.0, Double::sum);

        Map<String, Object> result = new HashMap<>();
        result.put("soDon", dons.size());
        result.put("doanhThu", doanhThu);
        result.put("donCuaNV", dons);

        return result;
    }

    
    // Thống kê theo ngày
    
    @Override
    public Map<String, Object> thongKeTheoNgay(LocalDate date) {

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<DonHang> dons = donHangRepo.findByngayLapBetween(start, end);

        Map<String, Object> result = new HashMap<>();
        result.put("soDon", dons.size());
        result.put("danhSach", dons);

        double doanhThu = dons.stream()
                .map(d -> d.getTongTien().doubleValue())
                .reduce(0.0, Double::sum);

        result.put("doanhThu", doanhThu);

        return result;
    }
}
