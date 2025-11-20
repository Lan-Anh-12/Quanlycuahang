package example.com.Repository;

import java.util.List;
import java.math.BigDecimal;
import example.com.model.sanpham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SanPhamRepository extends JpaRepository<sanpham, Integer> {
    // lấy theo tên 
    List<sanpham> findBytenspContaining( String keyword );

    // lấy theo MoTa
    List<sanpham> findByMoTaContaining( String keyword);

    // lấy ra số lượng 
    @Query("SELECT s.soluong FROM sanpham s WHERE s.maSP = :maSP")
    Integer getSoLuongByMaSP(int maSP);

    // xem còn hàng không 
    List<sanpham> findByTrangThai(String trangThai);
    
}
