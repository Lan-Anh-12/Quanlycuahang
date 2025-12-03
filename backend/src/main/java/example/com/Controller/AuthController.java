package example.com.Controller;

import example.com.Dto.auth.LoginRequest;
import example.com.Dto.auth.ChangePasswordRequest;
import example.com.Dto.auth.RefreshRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.DangNhap(request.getUsername(), request.getMatkhau());
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // REFRESH TOKEN
    @PostMapping("/refresh")
    public String refreshToken(@RequestBody RefreshRequest request) {
        return authService.refeshToken(request.getRefreshToken());
    }

    // ĐỔI MẬT KHẨU
    @PostMapping("/change-password")
    @PreAuthorize("hasAnyRole('NhanVien','QuanLy')")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        authService.doiMatKhau(request.getMaTK(), request.getMkCu(), request.getMkMoi());
        return ResponseEntity.ok("Đổi mật khẩu thành công!");
    }
}
