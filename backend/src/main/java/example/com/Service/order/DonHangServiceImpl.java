package example.com.Service.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.ChiTietDonHangRepository;
import example.com.Repository.DonHangRepository;
import example.com.Repository.SanPhamRepository;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import java.time.LocalDateTime;
import java.util.List;

@Service // đánh dấu lớp này là một service trong Spring
@Transactional
public class DonHangServiceImpl implements DonHangService {

    @Autowired // tự động tiêm DonHangRepository
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;


    @Override
    public DonHang TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs) {
        DonHang savedDonHang = donHangRepo.save(donHang);
        for (CT_DonHang ct : chiTietDonHangs) {
            ct.setMaDH(savedDonHang.getMaDH());
            chiTietDonHangRepo.save(ct);

            // Giảm tồn kho
            int row = sanPhamRepo.tangSoLuong(ct.getMaSP(), -ct.getSoLuong());
            if (row == 0) {
                throw new RuntimeException("Không tìm thấy sản phẩm: " + ct.getMaSP());
            }
        }
        return savedDonHang;
    }

    @Override
    public List<DonHang> LayDonHangTheoKhachHang(int maKH) {
        return donHangRepo.findByMaKH(maKH);
    }

    @Override
    public List<CT_DonHang> LayChiTietDonHangTheoDonHang(int maDH) {
        return chiTietDonHangRepo.findByMaDH(maDH);
    }

    @Override
    public List<DonHang> XemDonHangNVLap(int maNV) {
        return donHangRepo.findByMaNV(maNV);
    }
    @Override
    public List<DonHang> LayDonHangTheoKhoangNgay(LocalDateTime start, LocalDateTime end) {
        return donHangRepo.findByngayLapBetween(start, end);
    }
    @Override
    @Transactional
    public void XoaDonHang(int maDH) {
        // Xóa chi tiết trước
        chiTietDonHangRepo.deleteByMaDH(maDH);
        // Xóa đơn hàng
        donHangRepo.deleteById(maDH);
    }
    
     @Override
    @Transactional
    public DonHang CapNhatDonHang(DonHang donHang) {
        return donHangRepo.save(donHang);
    }

}
