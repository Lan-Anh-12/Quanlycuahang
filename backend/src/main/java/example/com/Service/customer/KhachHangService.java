package example.com.Service.customer;

import example.com.model.KhachHang;
import java.util.List;
import java.math.BigDecimal;

public interface KhachHangService {
    // CRUD khách hàng
    KhachHang taoKhachHang(KhachHang kh);
    KhachHang capNhatKhachHang(int maKH, KhachHang kh);
    KhachHang layKhachHangTheoMa(int maKH);
    List<KhachHang> layTatCaKhachHang();

    // Tìm kiếm
    List<KhachHang> timTheoTen(String ten);
    List<KhachHang> timTheoDiaChi(String diaChi);
    List<KhachHang> timKhachHangTheoDiem(int minPoint);


}
