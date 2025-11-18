package example.com.model;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "donhang")
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDH")
    private int maDH;

    @Column(name = "MaKH")
    private int maKH;

    @Column(name = "MaNV")
    private int maNV;

    @Column(name = "NgayLap")
    private LocalDateTime ngay_lap;

    @Column(name = "TongTien")
    private BigDecimal tongTien;

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL)
    private List<CT_DonHang> chiTietDonHangs;

    @ManyToOne
    @JoinColumn(name = "MaKH", insertable = false, updatable = false)
    @JsonIgnore
    private khachhang khachHang;


    public DonHang() {}

    public DonHang(int MaDH, int MaKH, int MaNV, LocalDateTime NgayLap, BigDecimal TongTien) {
        this.maDH = MaDH;
        this.maKH = MaKH;
        this.maNV = MaNV;
        this.ngay_lap = NgayLap;
        this.tongTien = TongTien;
    }
    // Getters and Setters
    public int getMaDH() {
        return maDH;
    }
    public void setMaDH(int maDH) {
        this.maDH = maDH;
    }
    public int getMaKH() {
        return maKH;
    }
    public void setMaKH(int maKH) {
        this.maKH = maKH;
    }
    public int getMaNV() {
        return maNV;
    }
    public void setMaNV(int maNV) {
        this.maNV = maNV;
    }
    public LocalDateTime getNgayLap() {
        return ngay_lap;
    }
    public void setNgayLap(LocalDateTime ngayLap) {
        this.ngay_lap = ngayLap;
    }
    public BigDecimal getTongTien() {
        return tongTien;
    }
    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }
    public List<CT_DonHang> getChiTietDonHangs() {
        return chiTietDonHangs;
    }
    public void setChiTietDonHangs(List<CT_DonHang> chiTietDonHangs) {
        this.chiTietDonHangs = chiTietDonHangs;
    }
}
