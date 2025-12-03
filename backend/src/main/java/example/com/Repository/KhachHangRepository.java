package example.com.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.KhachHang;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {


    // tìm tên theo keyword
    List<KhachHang> findByTenKHContainingIgnoreCase(String keyword);


    // Tìm theo điểm tích lũy >= ?
    List<KhachHang> findByDiemTichLuyGreaterThanEqual(int minPoint);

     // Tìm theo địa chỉ
    List<KhachHang> findByDiaChi(String diaChi);

    // Tìm khách theo khoảng điểm
    List<KhachHang> findByDiemTichLuyBetween(int min, int max);
}
