package example.com.Repository;
import example.com.model.nhapkho;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NhapKhoRepository extends JpaRepository<nhapkho, Integer> {
    // danh sách nhập kho theo mã nhân viên
    List<nhapkho> findByMaNV(int MaNV);

    // danh sách theo nhà cung cấp
    List<nhapkho> findByNhaCungCap( int nhaCungCap);

    // doanh thu
    nhapkho findByTongTien(BigDecimal tongTien);

    // đơn nhập kho theo ngày nhập hàng
    List<nhapkho> findByNgayNhap(LocalDateTime ngayNhap);


}
