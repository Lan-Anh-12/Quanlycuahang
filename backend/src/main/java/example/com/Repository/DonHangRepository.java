package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.DonHang;

import java.util.List;

public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    List<DonHang> findByMaKH(int MaKH);
}
