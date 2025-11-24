package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import example.com.model.DonHang;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    // Tìm đơn theo mã KH
    List<DonHang> findByMaKH(int MaKH);

     // Tìm đơn theo tháng
    @Query("SELECT d FROM DonHang d WHERE MONTH(d.ngayLap) =:month")
    List<DonHang> finByMonth(@Param("month") int month );

    //  Tính tổng doanh thu theo tháng
    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE MONTH(d.ngayLap) = :month")
    BigDecimal doanhThuTheoThang(@Param("month") int month);

    //  Tìm đơn của nhân viên
    List<DonHang> findByMaNV(int maNV);

    // Lấy đơn hàng theo mã (chi tiết 1 đơn)
    Optional<DonHang> findByMaDH(int maDH);

    // Tìm đơn trong 1 khoảng thời gian
    List<DonHang> findByngayLapBetween(LocalDateTime start, LocalDateTime end);

     // Tổng tiền khách đã chi (phục vụ ưu đãi)
    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE d.maKH = :maKH")
    BigDecimal tongTienChiCuaKhach(@Param("maKH") int maKH);

    // Số lượng đơn khách đã mua
    @Query("SELECT COUNT(d) FROM DonHang d WHERE d.maKH = :maKH")
    long soDonHangCuaKhach(@Param("maKH") int maKH);


}
