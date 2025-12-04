package example.com.Service.auth;

import example.com.model.TaiKhoan;
import example.com.Repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String DangNhap(String username, String matkhau) {

        TaiKhoan tk = taiKhoanRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Username không tồn tại"));

        if (!matkhau.equals(tk.getMatKhau())) {
            throw new RuntimeException("Mật khẩu sai");
        }

        return jwtUtil.generateToken(tk.getUsername(), tk.getRole());
    }

    @Override
    public String refeshToken(String refreshToken) {

        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Token không hợp lệ");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        String role = jwtUtil.extractRole(refreshToken);

        return jwtUtil.generateToken(username, role);
    }

    @Override
    public void DangXuat(String token) {}

    @Override
    public void doiMatKhau(String maTK, String mkCu, String mkMoi) {

        TaiKhoan tk = taiKhoanRepo.findById(maTK)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!mkCu.equals(tk.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ sai");
        }

        tk.setMatKhau(mkMoi);
        taiKhoanRepo.save(tk);
    }
}
