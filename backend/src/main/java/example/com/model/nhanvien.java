package example.com.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "nhanvien")
public class nhanvien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNV")
    private int maNV;

    @Column(name = "HoTen")
    private String tenNV;
    @Column(name = "SoDienThoai")
    private String sDT;
    @Column(name = "email")
    private String email;
    @Column(name = "NgayVaoLam")
    private LocalDate ngayVaoLam;

    @Column(name = "MaTK")
    private int maTK; // Foreign key to taikhoan


    public nhanvien() {}   

    public nhanvien(int MaNV, String TenNV, String SDT, String Email, LocalDate NgayVaoLam, Integer MaTK) {
        this.maNV = MaNV;
        this.tenNV = TenNV;
        this.sDT = SDT;
        this.email = Email;
        this.ngayVaoLam = NgayVaoLam;
        this.maTK = MaTK;
    }

    // Getters and Setters
    public int getMaNV() {
        return maNV;
    }
    public void setMaNV(int maNV) {
        this.maNV = maNV;
    }
    public String getTenNV() {
        return tenNV;
    }
    public void setTenNV(String tenNV) {
        this.tenNV = tenNV;
    }
    public String getSDT() {
        return sDT;
    }
    public void setSDT(String sDT) {
        this.sDT = sDT;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public LocalDate getNgayVaoLam() {
        return ngayVaoLam;
    }
    public void setNgayVaoLam(LocalDate ngayVaoLam) {
        this.ngayVaoLam = ngayVaoLam;
    }
    public int getMaTK() {
        return maTK;
    }
    public void setMaTK(int maTK) {
        this.maTK = maTK;
    }
    
    

}
