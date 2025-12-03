package example.com.Service.order;

import java.time.LocalDateTime;
import java.util.List;

import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

public interface DonHangService {
    //CRUD 
    DonHangResponse TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs);
    void XoaDonHang(int maDH);
    DonHang CapNhatDonHang(DonHang donHang, List<CT_DonHang> ct_DonHang);

    // lấy đơn hàng, ct đơn hàng
    List<DonHang> layHetDonHang();
    List<DonHang> LayDonHangTheoKhachHang(int maKH);
    List<CT_DonHang> LayChiTietDonHangTheoDonHang(int maDH);
    List<DonHang> XemDonHangNVLap(int maVN);
    List<DonHang> LayDonHangTheoKhoangNgay(LocalDateTime start, LocalDateTime end);
    
    
}
