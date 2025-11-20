package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.CT_DonHang;

import java.util.List;


public interface ChiTietDonHangRepository extends JpaRepository<CT_DonHang, Integer> {
    // Danh sách chi tiết đơn hàng theo mã đơn hàng
    List<CT_DonHang> findByMaDH(int maDH);

    
}


