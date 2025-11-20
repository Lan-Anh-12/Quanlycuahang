package example.com.Service.auth;

import java.time.LocalDateTime;
import example.com.model.lichsudangnhap;
import java.util.List;

public interface LoginHistoryService {
    lichsudangnhap TaoLichSuDangNhap(int maTk, LocalDateTime thoiGian, String ip );

    List<lichsudangnhap> LayLichSuTheoIp(String diaChiIP);

    
}
