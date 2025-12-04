package example.com.Controller;

import example.com.Dto.auth.LoginRequest;
import example.com.Dto.auth.ChangePasswordRequest;
import example.com.Dto.auth.RefreshRequest;
import example.com.Service.auth.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // chỉ để reference, CORS đã xử lý ở SecurityConfig
public class AuthController {

    @Autowired
    private AuthService authService;

    // ==== LOGIN ====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String jwtToken = authService.DangNhap(request.getUsername(), request.getMatkhau());
            return ResponseEntity.ok(jwtToken);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(e.getMessage());
        }
    }

    // ==== REFRESH TOKEN ====
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshRequest request) {
        try {
            String newToken = authService.refeshToken(request.getRefreshToken());
            return ResponseEntity.ok(newToken);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(e.getMessage());
        }
    }

    // ==== CHANGE PASSWORD ====
    @PostMapping("/change-password")
    @PreAuthorize("hasAnyRole('NhanVien','QuanLy')")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        authService.doiMatKhau(request.getMaTK(), request.getMkCu(), request.getMkMoi());
        return ResponseEntity.ok("Đổi mật khẩu thành công!");
    }
}
