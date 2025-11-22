package example.com.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.khachhang;

public interface KhachHangRepository extends JpaRepository<khachhang, Integer> {

    // Tìm theo tên
    List<khachhang> findByTenKH(String tenKH);

    // Tìm theo điểm tích lũy >= ?
    List<khachhang> findByDiemTichLuyGreaterThanEqual(int minPoint);

     // Tìm theo địa chỉ
    List<khachhang> findByDiaChi(String diaChi);

    // tìm theo số đt thoại
    Optional<khachhang> findBySdt(String sdt);

    // Tìm khách theo khoảng điểm
    List<khachhang> findByDiemTichLuyBetween(int min, int max);
}
