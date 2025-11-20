package example.com.Repository;

import java.util.List;
import example.com.model.taikhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaiKhoanRepository extends JpaRepository<taikhoan, Integer> {
    // lấy tài khoản của nhân viên, quản lý
    List<taikhoan> findByRole(String role);

    // lấy tên tk
    taikhoan findByUsername(String username);


    

}
