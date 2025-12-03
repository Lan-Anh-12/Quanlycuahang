package example.com.Repository;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import example.com.model.CT_DonHang;
import example.com.model.SanPham;

import java.util.List;


public interface ChiTietDonHangRepository extends JpaRepository<CT_DonHang, String> {

    // Lấy chi tiết theo mã đơn hàng
    List<CT_DonHang> findByMaDH(String maDH);

    // Lấy tất cả chi tiết chứa sản phẩm X
    List<CT_DonHang> findByMaSP(String maSP);

    // Xóa theo mã đơn hàng
    @Transactional
    void deleteByDonHang_MaDH(String maDH);

    // native — sản phẩm khách hàng mua
    @Query(value = "SELECT sp.tensp " +
            "FROM ct_donhang ct " +
            "JOIN donhang dh ON dh.MaDH = ct.MaDH " +
            "JOIN sanpham sp ON sp.MaSP = ct.MaSP " +
            "WHERE dh.MaKH = :maKH",
            nativeQuery = true)
    List<String> dsSanPhamDaMuaNative(@Param("maKH") String maKH);


    // JPQL — sản phẩm bán chạy theo tháng
    @Query("""
        SELECT ct.sanPham.maSP AS maSP, SUM(ct.soLuong) AS tongSL
        FROM CT_DonHang ct
        JOIN ct.donHang dh
        WHERE MONTH(dh.ngayLap) = :thang
        AND YEAR(dh.ngayLap) = :nam
        GROUP BY ct.sanPham.maSP
        ORDER BY tongSL DESC
    """)
    List<Object[]> sanPhamBanChayTheoThang(@Param("thang") int thang,
                                           @Param("nam") int nam);
}
