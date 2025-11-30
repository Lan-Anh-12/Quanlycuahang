package example.com.Repository;

import java.util.List;
import java.math.BigDecimal;
import example.com.model.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    // lấy theo tên 
    List<SanPham> findBytenSPContaining( String keyword );
    Optional<SanPham> findBytenSP(String tenSP);

    // lấy theo MoTa
    List<SanPham> findByMoTaContaining( String keyword);

    // lấy ra số lượng theo mã sp
    @Query("SELECT s.soLuong FROM SanPham s WHERE s.maSP = :maSP")
    Integer getSoLuongByMaSP(int maSP);

    // lấy ra số lượng theo tên
    @Query("SELECT s.soLuong FROM SanPham s WHERE LOWER(s.tenSP) LIKE LOWER(CONCAT('%', :tenSP, '%'))")
    Integer getSoLuongByTenSP(String tenSP);

    // lấy sản phẩm theo loại
    List<SanPham> findByPhanLoai(String phanLoai);

    // lấy url theo mã
    @Query("SELECT s.url FROM SanPham s WHERE s.maSP = :maSP")
    String findUrlByMaSP(@Param("maSP") int maSP);
    
    // xem còn hàng không 
    List<SanPham> findByTrangThai(String trangThai);

    // Lấy thông tin sản phẩm theo mã
    Optional<SanPham> findByMaSP(int maSP);

    // lấy sản phẩm còn bán 
    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai <> 'An'")
    List<SanPham> findAllNonDeleted();

    // lấy tất cả sp
    List<SanPham> findAll();


    
    
    //CRUD sản phẩm

    // xóa sp
    @Modifying
    @Query("UPDATE SanPham s SET s.trangThai = 'An' WHERE s.maSP = :maSP")
    void softDelete(@Param("maSP") int maSP);
    //cập nhật số lượng
    @Modifying
    @Transactional
    @Query("UPDATE SanPham s SET s.soLuong = s.soLuong + :amount WHERE s.maSP = :maSP")
    int tangSoLuong(@Param("maSP") int maSP, @Param("amount") int amount);
    // cập nhật trạng thái 
    @Transactional
    @Modifying
    @Query("UPDATE SanPham sp SET sp.trangThai = :trangThai WHERE sp.maSP = :maSP")
    void updateTrangThai(@Param("maSP") int maSP,
                         @Param("trangThai") String trangThai);
    
}
