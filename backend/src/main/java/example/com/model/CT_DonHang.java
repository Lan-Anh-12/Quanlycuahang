package example.com.model;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import example.com.model.khoachinh.CTDHIdGenerator;
import jakarta.persistence.*;

@Entity
@Table(name = "ct_donhang")
public class CT_DonHang {
    @Id
    @Column(name = "MaCTDH", length = 20)
    private String maCTDH;

    @Column(name = "MaDH", length = 20)
    private String maDH; // Foreign key to donhang

    @Column(name = "MaSP", length = 20)
    private String maSP;
    @Column(name = "SoLuong")
    private int soLuong;
    @Column(name = "DonGia")
    private BigDecimal donGia;
    @Column(name = "ThanhTien")
    private BigDecimal thanhTien;

    @ManyToOne
    @JoinColumn(name = "MaDH", insertable = false, updatable = false)
    @JsonIgnore
    private DonHang donHang;

    public CT_DonHang() {}

    @PrePersist
    public void generateMaCTDH() {
        if (this.maCTDH == null || this.maCTDH.isEmpty()) {
            // Gọi service hoặc logic tạo mã
            this.maCTDH = CTDHIdGenerator.generateNextId();
        }
    }

    public CT_DonHang(String MaCTDH, String MaDH, String MaSP, int SoLuong, BigDecimal DonGia, BigDecimal ThanhTien) {
        this.maCTDH = MaCTDH;
        this.maDH = MaDH;
        this.maSP = MaSP;
        this.soLuong = SoLuong;
        this.donGia = DonGia;
        this.thanhTien = ThanhTien;

    }
    // Getters and Setters
    public String getMaCTDH() {
        return maCTDH;
    }
    public void setMaCTDH(String maCTDH) {
        this.maCTDH = maCTDH;
    }
    public String getMaDH() {
        return maDH;
    }
    public void setMaDH(String maDH) {
        this.maDH = maDH;
    }
    public String getMaSP() {
        return maSP;
    }
    public void setMaSP(String maSP) {
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
