package example.com.Repository;

import example.com.model.lichsudangnhap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LichSuDangNhapRepository extends JpaRepository<lichsudangnhap, Integer> {
    // lấy số lần đăng nhập 1 tk
    List<lichsudangnhap> findBymaTK(int maTK);

    // lấy các tk đăng nhập cùng 1 máy
    List<lichsudangnhap> findBydiaChiIP(String diaChiIP);

    

}
