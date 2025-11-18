package example.com.model;
import jakarta.persistence.*;

@Entity
@Table(name = "taikhoan")
public class taikhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaTK")
    private int maTK;

    @Column(name = "username")
    private String username;
    @Column(name = "PasswordHash")
    private String matKhau;
    @Column(name = "role")
    private String role;

    public taikhoan() {}

    public taikhoan(int MaTK, String username, String MatKhau, String Role) {
        this.maTK = MaTK;
        this.username = username;
        this.matKhau = MatKhau;
        this.role = Role;
    }
    // Getters and Setters
    public int getMaTK() {
        return maTK;
    }
    public void setMaTK(int maTK) {
        this.maTK = maTK;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMatKhau() {
        return matKhau;
    }
    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    
}
