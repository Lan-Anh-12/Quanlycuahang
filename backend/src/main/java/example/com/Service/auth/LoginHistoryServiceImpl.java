package example.com.Service.auth;

import example.com.model.Lichsudangnhap;
import example.com.Repository.LichSuDangNhapRepository;
import example.com.Repository.TaiKhoanRepository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LoginHistoryServiceImpl implements LoginHistoryService {
    @Autowired
    private LichSuDangNhapRepository lichSuDangNhapRepo;

    

    @Override
    public Lichsudangnhap TaoLichSuDangNhap( Lichsudangnhap lichsu) {
        Lichsudangnhap savedlichsu = lichSuDangNhapRepo.save(lichsu);

        return savedlichsu;
    }
    @Override
     public List<Lichsudangnhap> LayLichSuTheoIp(String diaChiIP) {
        List<Lichsudangnhap> list = lichSuDangNhapRepo.findBydiaChiIP(diaChiIP);
        if (list.isEmpty()) {
        throw new RuntimeException("Không tìm thấy lịch sử đăng nhập nào với IP này");
    }
        return list;

     }





}
