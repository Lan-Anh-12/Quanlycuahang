package example.com.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sanpham")
public class sanpham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSP")
    private int maSP;

    @Column(name = "tensp")
    private String tenSP;
    @Column(name = "DonGia")
    private BigDecimal donGia;
    @Column(name = "SoLuong")
    private int soLuongTon;
    @Column(name = "MoTa")
    private String moTa;
    @Column(name = "TrangThai")
    private String trangThai;

    public sanpham() {}

    public sanpham(int MaSP, String TenSP, BigDecimal DonGia, int SoLuongTon, String MoTa, String TrangThai) {
        this.maSP = MaSP;
        this.tenSP = TenSP;
        this.donGia = DonGia;
        this.soLuongTon = SoLuongTon;
        this.moTa = MoTa;
        this.trangThai = TrangThai;
    }
    
    // Getters and Setters
    public int getMaSP() {
        return maSP;
    }
    public void setMaSP(int maSP) {
        this.maSP = maSP;
    }
    public String getTenSP() {
        return tenSP;
    }
    public void setTenSP(String tenSP) {
        this.tenSP = tenSP;
    }
    public BigDecimal getDonGia() {
        return donGia;
    }
    public void setDonGia(BigDecimal donGia) {
        this.donGia = donGia;
    }
    public int getSoLuongTon() {
        return soLuongTon;
    }
    public void setSoLuongTon(int soLuongTon) {
        this.soLuongTon = soLuongTon;
    }
    public String getMoTa() {
        return moTa;
    }
    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
    public String getTrangThai() {
        return trangThai;
    }
    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}
