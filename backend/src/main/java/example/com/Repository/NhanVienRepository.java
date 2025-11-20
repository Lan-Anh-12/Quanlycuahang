package example.com.Repository;
import example.com.model.nhanvien;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienRepository extends JpaRepository<nhanvien, Integer> {
    
    // Danh sách nhân viên theo tên
    List<nhanvien> findByTenNVContaining(String keyword);


    //  theo email
    nhanvien findByEmail(String email);
 
    // theo khoảng thời gian
    List<nhanvien> findByNgayVaoLamBetween(LocalDate start, LocalDate end);

    // theo ngày vào làm
    List<nhanvien> findByNgayVaoLam(LocalDate date);


}
