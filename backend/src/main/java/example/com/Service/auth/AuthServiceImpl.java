package example.com.Service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import example.com.Repository.NhanVienRepository;
import example.com.Repository.TaiKhoanRepository;
import example.com.model.NhanVien;
import example.com.model.TaiKhoan;

@Service 
public class AuthServiceImpl implements AuthService {

    @Autowired 
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Override
    public String DangNhap(String username, String matkhau) {
        TaiKhoan tk = taiKhoanRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(matkhau, tk.getMatKhau())) {
            throw new RuntimeException("Sai mật khẩu");
        }
         NhanVien nv = nhanVienRepository.findByMaTK(tk.getMaTK())
        .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại"));

        if (!"LamViec".equals(nv.getTrangThai())) {
            throw new RuntimeException("Nhân viên hiện không làm việc, không thể đăng nhập");
        }

        return jwtUtil.generateToken(tk.getUsername(), tk.getRole());
    }

    @Override
    public String refeshToken(String refreshToken) {
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Refresh token không hợp lệ");
        }

        String username = jwtUtil.extractUsername(refreshToken);

        TaiKhoan tk = taiKhoanRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        return jwtUtil.generateToken(tk.getUsername(), tk.getRole());
    }

    @Override
    public void DangXuat(String token) {
        // Nếu dùng JWT stateless thì không cần làm gì
    }

    @Override 
    public void doiMatKhau(String maTK, String mkCu, String mkMoi) {
        TaiKhoan tk = taiKhoanRepository.findById(maTK)
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(mkCu, tk.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        tk.setMatKhau(passwordEncoder.encode(mkMoi));
        taiKhoanRepository.save(tk);
    }

    @Override
    public String getMaTKByUsername(String username) {
        TaiKhoan tk = taiKhoanRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        return tk.getMaTK();
    }
}
