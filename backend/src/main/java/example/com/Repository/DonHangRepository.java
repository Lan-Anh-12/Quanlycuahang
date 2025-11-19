package example.com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import example.com.model.DonHang;

import java.util.List;

public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    List<DonHang> findByMaKH(int MaKH);

    @Query("SELECT COUNT(DISTINCT d.maKH) AS soLuongKhach, COUNT(d) AS soLuongDon, SUM(d.tongTien) AS tongDoanhThu " +
       "FROM DonHang d " +
       "WHERE MONTH(d.ngayTao) = :month AND YEAR(d.ngayTao) = :year")
    Object[] thongKeTheoThang(@Param("month") int month, @Param("year") int year);

}
