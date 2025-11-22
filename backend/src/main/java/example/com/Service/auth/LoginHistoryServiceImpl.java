package example.com.Service.auth;

import example.com.model.lichsudangnhap;
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
    public lichsudangnhap TaoLichSuDangNhap( lichsudangnhap lichsu) {
        lichsudangnhap savedlichsu = lichSuDangNhapRepo.save(lichsu);

        return savedlichsu;
    }
    @Override
     public List<lichsudangnhap> LayLichSuTheoIp(String diaChiIP) {
        List<lichsudangnhap> list = lichSuDangNhapRepo.findBydiaChiIP(diaChiIP);
        if (list.isEmpty()) {
        throw new RuntimeException("Không tìm thấy lịch sử đăng nhập nào với IP này");
    }
        return list;

     }





}
