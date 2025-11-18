package example.com.Service.order;

import java.util.List;

import example.com.model.CT_DonHang;
import example.com.model.DonHang;

public interface DonHangService {
    DonHang TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs);
    List<DonHang> LayDonHangTheoKhachHang(int maKH);
    List<CT_DonHang> LayChiTietDonHangTheoDonHang(int maDH);
     
}
