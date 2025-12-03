package example.com.Controller;

import example.com.Dto.auth.LoginRequest;
import example.com.Dto.auth.ChangePasswordRequest;
import example.com.Dto.auth.RefreshRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import example.com.Service.auth.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    //  ĐĂNG NHẬP
   
    @PostMapping("/login")
    @PreAuthorize("hasAnyRole('NhanVien','QuanLy')")
    public String login(@RequestBody LoginRequest request) {
        return authService.DangNhap(request.getUsername(), request.getMatkhau());
    }

    //  REFRESH TOKEN
   
    @PostMapping("/refresh")
    public String refreshToken(@RequestBody RefreshRequest request) {
        return authService.refeshToken(request.getRefreshToken());
    }   
   
    //  ĐỔI MẬT KHẨU
    
    @PostMapping("/change-password")
    @PreAuthorize("hasAnyRole('NhanVien','QuanLy')")
    public void changePassword(@RequestBody ChangePasswordRequest request) {
        authService.doiMatKhau(request.getMaTK(), request.getMkCu(), request.getMkMoi());
    }
}