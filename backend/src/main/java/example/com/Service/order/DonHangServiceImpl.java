package example.com.Service.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.ChiTietDonHangRepository;
import example.com.Repository.DonHangRepository;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import java.util.List;

@Service // đánh dấu lớp này là một service trong Spring
@Transactional
public class DonHangServiceImpl implements DonHangService {

    @Autowired // tự động tiêm DonHangRepository
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepo;

    @Override
    public DonHang TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs) {
        DonHang savedDonHang = donHangRepo.save(donHang);
        for (CT_DonHang ct : chiTietDonHangs) {
            ct.setMaDH(savedDonHang.getMaDH());
            chiTietDonHangRepo.save(ct);
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

}
