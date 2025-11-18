package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.CT_DonHang;

import java.util.List;


public interface ChiTietDonHangRepository extends JpaRepository<CT_DonHang, Integer> {
    List<CT_DonHang> findByMaDH(int maDH);
}
