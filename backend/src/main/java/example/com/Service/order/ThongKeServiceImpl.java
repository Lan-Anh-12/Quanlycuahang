package example.com.Service.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.DonHangRepository;
import example.com.Repository.ChiTietDonHangRepository;
import example.com.Dto.ThongKeDonHangRequest;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import java.util.List;
import java.math.BigDecimal;

@Service
@Transactional
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepo;

    // ... các method hiện có (TaoDonHang, LayDonHangTheoKhachHang, LayChiTietDonHangTheoDonHang)

    @Override
public ThongKeDonHangRequest thongKeTheoThang(int month, int year) {
    Object[] raw = donHangRepo.thongKeTheoThang(month, year);
    if (raw == null || raw.length == 0 || raw[0] == null) {
        return new ThongKeDonHangRequest(0, 0, BigDecimal.ZERO);
    }
    int soLuongKhach = ((Number) raw[0]).intValue();
    int soLuongDon = ((Number) raw[1]).intValue();
    BigDecimal tongDoanhThu = raw[2] == null ? BigDecimal.ZERO : (BigDecimal) raw[2];

    return new ThongKeDonHangRequest(soLuongKhach, soLuongDon, tongDoanhThu);
}

}
