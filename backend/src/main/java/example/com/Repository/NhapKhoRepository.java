package example.com.Repository;
import example.com.model.NhapKho;
import java.time.LocalDateTime;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;


public interface NhapKhoRepository extends JpaRepository<NhapKho, Integer> {
    // danh sách nhập kho theo mã nhân viên
    List<NhapKho> findByMaNV(int MaNV);

    // danh sách theo nhà cung cấp
    List<NhapKho> findByNhaCungCap( String nhaCungCap);

    // đơn nhập kho theo ngày nhập hàng
    List<NhapKho> findByNgayNhap(LocalDateTime ngayNhap);


}
