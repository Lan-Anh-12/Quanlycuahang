package example.com.Repository;

import java.util.List;
import java.math.BigDecimal;
import example.com.model.sanpham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface SanPhamRepository extends JpaRepository<sanpham, Integer> {
    // lấy theo tên 
    List<sanpham> findBytenSPContaining( String keyword );

    // lấy theo MoTa
    List<sanpham> findByMoTaContaining( String keyword);

    // lấy ra số lượng 
    @Query("SELECT s.soLuong FROM sanpham s WHERE s.maSP = :maSP")
    Integer getSoLuongByMaSP(int maSP);

    // xem còn hàng không 
    List<sanpham> findByTrangThai(String trangThai);

    // Lấy thông tin sản phẩm theo mã
    Optional<sanpham> findByMaSP(int maSP);

    //cập nhật số lượng
    @Modifying
    @Transactional
    @Query("UPDATE sanpham s SET s.soLuong = s.soLuong + :amount WHERE s.maSP = :maSP")
    int tangSoLuong(@Param("maSP") int maSP, @Param("amount") int amount);
    
}
