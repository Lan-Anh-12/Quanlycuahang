package example.com.Service.customer;

import example.com.model.KhachHang;
import example.com.Dto.khachhang.KhachHangRequest;
import example.com.Dto.khachhang.KhachHangResponse;

import java.util.List;
import java.math.BigDecimal;

public interface KhachHangService {

    // CRUD khách hàng
    KhachHangResponse taoKhachHang(KhachHangRequest kh);

    KhachHangResponse capNhatKhachHang(String maKH, KhachHangRequest kh); // cập nhật thông tin khách hàng

    KhachHangResponse layKhachHangTheoMa(String maKH);

    List<KhachHangResponse> layTatCaKhachHang();

    // Tìm kiếm
    List<KhachHangResponse> searchKhachHang(String ten); // tìm kiếm theo tên hoặc sđt
}
