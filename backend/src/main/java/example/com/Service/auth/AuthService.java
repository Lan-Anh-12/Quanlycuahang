package example.com.Service.auth;



public interface AuthService {
    String DangNhap(String username, String matkhau);
    String refeshToken(String refeshToken);
    void DangXuat(String token);

}
    