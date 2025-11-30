package example.com.Repository;
import example.com.model.NhanVien;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    
    // Danh sách nhân viên theo tên
    List<NhanVien> findByTenNVContaining(String keyword);


    //  theo email
    Optional<NhanVien> findByEmail(String email);
 
    // theo khoảng thời gian
    List<NhanVien> findByNgayVaoLamBetween(LocalDate start, LocalDate end);

    // theo ngày vào làm
    List<NhanVien> findByNgayVaoLam(LocalDate date);


}
