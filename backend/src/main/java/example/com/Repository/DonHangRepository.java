package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import example.com.model.DonHang;

import java.math.BigDecimal;
import java.util.List;

public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    // 1. Tìm đơn theo mã KH
    List<DonHang> findByMaKH(int MaKH);

     // 2. Tìm đơn theo tháng
    @Query("SELECT d FROM DonHang d WHERE MONTH(d.ngay_lap) =:month")
    List<DonHang> finByMonth(@Param("month") int month );

    // 3. Tính tổng doanh thu theo tháng
    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE MONTH(d.ngayTao) = :month")
    BigDecimal doanhThuTheoThang(@Param("month") int month);

    // 4. Tìm đơn của nhân viên
    List<DonHang> findByMaNV(int maNV);
}
