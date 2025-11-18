package example.com.model;
import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "ct_donhang")
public class CT_DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaCTDH")
    private int maCTDH;

    @Column(name = "MaDH")
    private int maDH; // Foreign key to donhang

    @Column(name = "MaSP")
    private int maSP;
    @Column(name = "SoLuong")
    private int soLuong;
    @Column(name = "DonGia")
    private BigDecimal donGia;
    @Column(name = "ThanhTien")
    private BigDecimal thanhTien;

    @ManyToOne
    @JoinColumn(name = "MaDH", insertable = false, updatable = false)
    private DonHang donHang;

    public CT_DonHang() {}

    public CT_DonHang(int MaCTDH, int MaDH, int MaSP, int SoLuong, BigDecimal DonGia, BigDecimal ThanhTien) {
        this.maCTDH = MaCTDH;
        this.maDH = MaDH;
        this.maSP = MaSP;
        this.soLuong = SoLuong;
        this.donGia = DonGia;
        this.thanhTien = ThanhTien;

    }
    // Getters and Setters
    public int getMaCTDH() {
        return maCTDH;
    }
    public void setMaCTDH(int maCTDH) {
        this.maCTDH = maCTDH;
    }
    public int getMaDH() {
        return maDH;
    }
    public void setMaDH(int maDH) {
        this.maDH = maDH;
    }
    public int getMaSP() {
        return maSP;
    }
    public void setMaSP(int maSP) {
        this.maSP = maSP;
    }
    public int getSoLuong() {
        return soLuong;
    }
    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }
    public BigDecimal getDonGia() {
        return donGia;
    }
    public void setDonGia(BigDecimal donGia) {
        this.donGia = donGia;
    }
    public BigDecimal getThanhTien() {
        return thanhTien;
    }
    public void setThanhTien(BigDecimal thanhTien) {
        this.thanhTien = thanhTien;
    }
    public DonHang getDonHang() {
         return donHang; 
    }
    public void setDonHang(DonHang donHang) {
        this.donHang = donHang;
    }
}
