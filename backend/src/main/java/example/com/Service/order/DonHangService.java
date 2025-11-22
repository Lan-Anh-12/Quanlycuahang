package example.com.Service.order;

import java.time.LocalDateTime;
import java.util.List;

import example.com.model.CT_DonHang;
import example.com.model.DonHang;

public interface DonHangService {
    DonHang TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs);
    List<DonHang> LayDonHangTheoKhachHang(int maKH);
    List<CT_DonHang> LayChiTietDonHangTheoDonHang(int maDH);
    List<DonHang> XemDonHangNVLap(int maVN);
    List<DonHang> LayDonHangTheoKhoangNgay(LocalDateTime start, LocalDateTime end);
    void XoaDonHang(int maDH);
    DonHang CapNhatDonHang(DonHang donHang);
}
