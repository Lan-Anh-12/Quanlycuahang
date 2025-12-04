package example.com.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import example.com.Service.customer.KhachHangService;
import example.com.Service.inventory.InventoryService;
import example.com.Service.order.DonHangService;
import example.com.Service.order.ThongKeService;
import example.com.Dto.khachhang.KhachHangResponse;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Dto.sanpham.SanPhamResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.DayOfWeek;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private KhachHangService khachHangService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private DonHangService donHangService;

    @Autowired
    private ThongKeService thongKeService;

    //  KPIs: tổng nhân viên + tổng khách hàng
    @GetMapping("/kpis")
    public Map<String, Object> getKpis() {
        int totalEmployees = 45; // Nếu có NhanVienService: layTatCaNhanVien().size()
        int totalCustomers = khachHangService.layTatCaKhachHang().size();
        Map<String,Object> map = new HashMap<>();
        map.put("totalEmployees", totalEmployees);
        map.put("totalCustomers", totalCustomers);
        return map;
    }

    //  Top 5 khách hàng theo tổng tiền
    @GetMapping("/top-customers")
    public List<Map<String,Object>> getTopCustomers() {
        List<KhachHangResponse> allCustomers = khachHangService.layTatCaKhachHang();

        List<Map<String,Object>> result = allCustomers.stream()
                .map(c -> {
                    List<DonHangResponse> orders = donHangService.LayDonHangTheoKhachHang(c.getMaKH());
                    BigDecimal totalSpent = orders.stream()
                                                 .map(DonHangResponse::getTongTien)
                                                 .reduce(BigDecimal.ZERO, BigDecimal::add);
                    Map<String,Object> map = new HashMap<>();
                    map.put("name", c.getTenKH());
                    map.put("total_spent", totalSpent);
                    return map;
                })
                .sorted((a,b) -> ((BigDecimal)b.get("total_spent")).compareTo((BigDecimal)a.get("total_spent")))
                .limit(5)
                .collect(Collectors.toCollection(ArrayList::new));

        return result;
    }

    //  Doanh thu tuần (Thứ 2 -> Chủ nhật tuần hiện tại)
    @GetMapping("/weekly-revenue")
    public List<Map<String,Object>> getWeeklyRevenue() {
        LocalDate now = LocalDate.now();
        LocalDate monday = now.with(DayOfWeek.MONDAY);

        List<Map<String,Object>> result = new ArrayList<>();
        for(int i=0;i<7;i++) {
            LocalDate day = monday.plusDays(i);
            List<DonHangResponse> orders = donHangService.LayDonHangTheoKhoangNgay(day.atStartOfDay(), day.plusDays(1).atStartOfDay());
            BigDecimal revenue = orders.stream()
                                       .map(DonHangResponse::getTongTien)
                                       .reduce(BigDecimal.ZERO, BigDecimal::add);
            String dayName = switch(day.getDayOfWeek()) {
                case MONDAY -> "Thứ Hai";
                case TUESDAY -> "Thứ Ba";
                case WEDNESDAY -> "Thứ Tư";
                case THURSDAY -> "Thứ Năm";
                case FRIDAY -> "Thứ Sáu";
                case SATURDAY -> "Thứ Bảy";
                case SUNDAY -> "Chủ Nhật";
            };
            Map<String,Object> map = new HashMap<>();
            map.put("day", dayName);
            map.put("revenue", revenue);
            result.add(map);
        }

        return result;
    }

    //  Sản phẩm sắp hết hàng (tồn kho <= 20)
    @GetMapping("/low-stock")
    public List<Map<String,Object>> getLowStockProducts() {
    List<SanPhamResponse> allProducts = inventoryService.sanPhamConBan();

    List<Map<String,Object>> lowStock = allProducts.stream()
            .map(p -> {
                int tonKho = ((Number) inventoryService.xemTonKho(p.getMaSP())).intValue(); // ép kiểu
                Map<String,Object> map = new HashMap<>();
                map.put("name", p.getTenSP());
                map.put("stock", tonKho);
                return map;
            })
            .filter(p -> (int)p.get("stock") <= 20) // lọc tồn kho <= 20
            .collect(Collectors.toCollection(ArrayList::new));

    return lowStock;
}


    //  Doanh thu theo category (tháng hiện tại)
    @GetMapping("/revenue-by-category")
    public List<Map<String,Object>> getRevenueByCategory() {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        List<Map<String,Object>> salesByCategory = thongKeService.sanPhamBanChayTheoThang(month, year);
        Map<String, BigDecimal> categoryRevenue = new HashMap<>();
        for(Map<String,Object> item: salesByCategory) {
            String category = (String)item.get("category");
            BigDecimal revenue = ((BigDecimal)item.get("revenue_amount"));
            categoryRevenue.put(category, categoryRevenue.getOrDefault(category, BigDecimal.ZERO).add(revenue));
        }

        BigDecimal totalRevenue = categoryRevenue.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Map<String,Object>> result = new ArrayList<>();
        for(Map.Entry<String,BigDecimal> entry: categoryRevenue.entrySet()) {
            BigDecimal percent = totalRevenue.compareTo(BigDecimal.ZERO)==0 ? BigDecimal.ZERO : entry.getValue().multiply(BigDecimal.valueOf(100)).divide(totalRevenue, 0, BigDecimal.ROUND_HALF_UP);
            Map<String,Object> map = new HashMap<>();
            map.put("category", entry.getKey());
            map.put("revenue_percent", percent);
            map.put("revenue_amount", entry.getValue());
            result.add(map);
        }

        return result;
    }
}
