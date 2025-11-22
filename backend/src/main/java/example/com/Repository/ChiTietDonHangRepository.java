package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import example.com.model.CT_DonHang;

import java.util.List;


public interface ChiTietDonHangRepository extends JpaRepository<CT_DonHang, Integer> {
    // Danh sách chi tiết đơn hàng theo mã đơn hàng
    List<CT_DonHang> findByMaDH(int maDH);

    // Tìm tất cả đơn chứa sản phẩm này
    List<CT_DonHang> findByMaSP(int maSP);

    @Transactional
    void deleteByMaDH(int maDH);


    
}


