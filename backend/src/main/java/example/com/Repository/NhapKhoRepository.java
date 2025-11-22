package example.com.Repository;
import example.com.model.nhapkho;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface NhapKhoRepository extends JpaRepository<nhapkho, Integer> {
    // danh sách nhập kho theo mã nhân viên
    List<nhapkho> findByMaNV(int MaNV);

    // danh sách theo nhà cung cấp
    List<nhapkho> findByNhaCungCap( int nhaCungCap);

    


    // đơn nhập kho theo ngày nhập hàng
    List<nhapkho> findByNgayNhap(LocalDateTime ngayNhap);


}
