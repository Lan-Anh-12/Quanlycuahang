package example.com.model;
import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "khachhang")
public class khachhang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaKH")
    private int maKH;

    @Column(name = "HoTen")
    private String tenKH;   
    @Column(name = "NamSinh")
    private int namSinh;
    @Column(name = "DiaChi")
    private String diaChi;
    @Column(name = "DiemTichLuy")
    private int diemTichLuy;

    @OneToMany(mappedBy = "khachHang", cascade = CascadeType.ALL)
    private java.util.List<DonHang> donHangs;
    
    public khachhang() {}

    public khachhang(int MaKH, String TenKH, int NamSinh, String DiaChi, int DiemTichLuy) {
        this.maKH = MaKH;
        this.tenKH = TenKH;
        this.namSinh = NamSinh;
        this.diaChi = DiaChi;
        this.diemTichLuy = DiemTichLuy;
    }
    // Getters and Setters
    public int getMaKH() {
        return maKH;
    }
    public void setMaKH(int maKH) {
        this.maKH = maKH;
    }
    public String getTenKH() {
        return tenKH;
    }
    public void setTenKH(String tenKH) {
        this.tenKH = tenKH;
    }
    public int getNamSinh() {
        return namSinh;
    }   
    public void setNamSinh(int namSinh) {
        this.namSinh = namSinh;
    }
    public String getDiaChi() {
        return diaChi;
    }
    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }
    public int getDiemTichLuy() {
        return diemTichLuy;
    }
    public void setDiemTichLuy(int diemTichLuy) {
        this.diemTichLuy = diemTichLuy;
    }
    public List<DonHang> getDonHangs() {
        return donHangs;
    }

    public void setDonHangs(List<DonHang> donHangs) {
        this.donHangs = donHangs;
    }


}
