package example.com.Repository;

import example.com.model.Lichsudangnhap;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LichSuDangNhapRepository extends JpaRepository<Lichsudangnhap, Integer> {
    // lấy số lần đăng nhập 1 tk
    List<Lichsudangnhap> findBymaTK(int maTK);

    // lấy các tk đăng nhập cùng 1 máy
    List<Lichsudangnhap> findBydiaChiIP(String diaChiIP);

   
}
