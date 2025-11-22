package example.com.Service.auth;

import java.time.LocalDateTime;
import example.com.model.lichsudangnhap;
import java.util.List;
import java.util.Optional;

public interface LoginHistoryService {
    lichsudangnhap TaoLichSuDangNhap(lichsudangnhap lichsu );

    List<lichsudangnhap> LayLichSuTheoIp(String diaChiIP);

    
}
