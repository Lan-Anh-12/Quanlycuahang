package example.com.Repository;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import example.com.model.CT_DonHang;
import example.com.model.SanPham;

import java.util.List;


public interface ChiTietDonHangRepository extends JpaRepository<CT_DonHang, Integer> {
    // Danh sách chi tiết đơn hàng theo mã đơn hàng
    List<CT_DonHang> findByMaDH(int maDH);

    // Tìm tất cả đơn chứa sản phẩm này
    List<CT_DonHang> findByMaSP(int maSP);

    @Transactional
    void deleteByMaDH(int maDH);

    // danh sách sản phẩm khách hàng mua
    @Query(value = "SELECT sp.tensp " +
               "FROM CT_DonHang ct " +
               "JOIN DonHang dh ON dh.MaDH = ct.MaDH " +
               "JOIN SanPham sp ON sp.MaSP = ct.MaSP " +
               "WHERE dh.MaKH = :maKH", nativeQuery = true)
List<String> dsSanPhamDaMuaNative(@Param("maKH") int maKH);


    // sản phẩm bán chạy trong tháng
    @Query("SELECT ct.maSP AS maSP, SUM(ct.soLuong) AS tongSL " +
       "FROM CT_DonHang ct " +
       "JOIN ct.donHang dh " +
       "WHERE MONTH(dh.ngayLap) = :thang " +
       "AND YEAR(dh.ngayLap) = :nam " +
       "GROUP BY ct.maSP " +
       "ORDER BY tongSL DESC")
List<Object[]> sanPhamBanChayTheoThang(@Param("thang") int thang,
                                       @Param("nam") int nam);





    
}


