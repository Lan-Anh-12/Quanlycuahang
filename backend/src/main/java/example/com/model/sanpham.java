package example.com.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sanpham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSP")
    private int maSP;

    @Column(name = "tensp")
    private String tenSP;
    @Column(name = "DonGia")
    private BigDecimal donGia;
    @Column(name = "SoLuong")
    private int soLuong;
    @Column(name = "MoTa")
    private String moTa;
    @Column(name = "url")
    private String url;
    @Column(name = "PhanLoai")
    private String phanLoai;
    @Column(name = "TrangThai")
    private String trangThai;

    public SanPham() {}

    public SanPham(int MaSP, String TenSP, BigDecimal DonGia, int SoLuongTon, String MoTa,String url,String phanLoai, String TrangThai) {
        this.maSP = MaSP;
        this.tenSP = TenSP;
        this.donGia = DonGia;
        this.soLuong = SoLuongTon;
        this.moTa = MoTa;
        this.url = url;
        this.phanLoai = phanLoai;
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
        return soLuong;
    }
    public void setSoLuongTon(int soLuongTon) {
        this.soLuong = soLuongTon;
    }
    public String getMoTa() {
        return moTa;
    }
    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public String getPhanLoai() {
        return phanLoai;
    }
    public void setPhanLoai(String phanLoai) {
        this.phanLoai = phanLoai;
    }
    public String getTrangThai() {
        return trangThai;
    }
    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}
