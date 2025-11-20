package example.com.Service.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import example.com.Repository.TaiKhoanRepository;
import example.com.model.taikhoan;


@Service 
public class AuthServiceImpl implements AuthService{
    @Autowired 
    private TaiKhoanRepository taiKhoanRepository;
    
    @Autowired 
    private JwtUtil jwtUtil;

    @Override
    public String DangNhap(String username, String matkhau) {
        // Tìm tài khoản 
        taikhoan tk = taiKhoanRepository.findByUsername( username);
        if( tk == null ) {
            throw new RuntimeException("Tài khoản không tồn tại");
        }

        // kiểm tra mật khẩu
        if(!matkhau.equals(tk.getMatKhau())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        // tạo jwt trả cho client
        String token = jwtUtil.generateToken(tk.getUsername(),tk.getRole());

        return token;
    }

    @Override
    public String refeshToken(String refreshToken){
        // kiểm tra token họp lệ
        if(!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Refresh token không hợp lệ");
            }
    
        // lấy username
        String username = jwtUtil.extractUsername(refreshToken);

        taikhoan tk = taiKhoanRepository.findByUsername( username);
        if (tk == null) {
        throw new RuntimeException("Tài khoản không tồn tại");
    }

        return jwtUtil.generateToken(tk.getUsername(), tk.getRole());
    }

    @Override
    public void DangXuat(String token){

    }

    
}
