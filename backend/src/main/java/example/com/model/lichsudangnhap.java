package example.com.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity 
@Table(name = "lichsudangnhap")
public class Lichsudangnhap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLS")
    private int maLS;

    @Column(name = "MaTK")
    private int maTK; // Foreign key to taikhoan

    @Column(name = "ThoiGian")
    private LocalDateTime thoiGianDangNhap;
    @Column(name = "DiaChiIP")
    private String diaChiIP;

   
    

    public Lichsudangnhap() {}

    public Lichsudangnhap(int MaLS, int MaTK, LocalDateTime ThoiGianDangNhap, String DiaChiIP) {
        this.maLS = MaLS;
        this.maTK = MaTK; // Foreign key to taikhoan
        this.thoiGianDangNhap = ThoiGianDangNhap;
        this.diaChiIP = DiaChiIP;
    }
    // Getters and Setters
    public int getMaLS() {
        return maLS;
    }
    public void setMaLS(int maLS) {
        this.maLS = maLS;
    }
    public int getMaTK() {
        return maTK;
    }
    public void setMaTK(int maTK) {
        this.maTK = maTK;
    }
    public LocalDateTime getThoiGianDangNhap() {
        return thoiGianDangNhap;
    }
    public void setThoiGianDangNhap(LocalDateTime thoiGianDangNhap) {
        this.thoiGianDangNhap = thoiGianDangNhap;
    }
    public String getDiaChiIP() {
        return diaChiIP;
    }
    public void setDiaChiIP(String diaChiIP) {
        this.diaChiIP = diaChiIP;
    }

}
