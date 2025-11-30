package example.com.Service.auth;

import example.com.model.Lichsudangnhap;
import java.util.List;


public interface LoginHistoryService {
    Lichsudangnhap TaoLichSuDangNhap(Lichsudangnhap lichsu );

    List<Lichsudangnhap> LayLichSuTheoIp(String diaChiIP);

    
}
