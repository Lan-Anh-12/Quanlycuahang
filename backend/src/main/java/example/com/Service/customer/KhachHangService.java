package example.com.Service.customer;

import example.com.model.DonHang;
import example.com.model.khachhang;
import java.util.List;

public interface KhachHangService {
    // CRUD khách hàng
    khachhang taoKhachHang(khachhang kh);
    khachhang capNhatKhachHang(int maKH, khachhang kh);
    void xoaKhachHang(int maKH);
    khachhang layKhachHangTheoMa(int maKH);
    List<khachhang> layTatCaKhachHang();

    // Tìm kiếm
    List<khachhang> timTheoTen(String ten);
    List<khachhang> timTheoDiaChi(String diaChi);
    List<khachhang> timKhachHangTheoDiem(int minPoint);


}
