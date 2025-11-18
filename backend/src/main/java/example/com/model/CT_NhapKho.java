package example.com.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "ct_nhapkho")
public class CT_NhapKho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaCTNK")
    private int maCTNK;

    @Column(name = "MaNK")
    private int maNK; // Foreign key to nhapkho

    @Column(name = "MaSP")
    private int maSP;
    @Column(name = "SoLuong")
    private int soLuong;
    @Column(name = "DonGia")
    private BigDecimal donGia;
    @Column(name = "ThanhTien")
    private BigDecimal thanhTien;

    @ManyToOne
    @JoinColumn(name = "MaNK", insertable = false, updatable = false)
    @JsonIgnore
    private nhapkho nhapKho;

    public CT_NhapKho() {}

    public CT_NhapKho(int MaCTNK, int MaNK, int MaSP, int SoLuong, BigDecimal DonGia, BigDecimal ThanhTien) {
        this.maCTNK = MaCTNK;
        this.maNK = MaNK;
        this.maSP = MaSP;
        this.soLuong = SoLuong;
        this.donGia = DonGia;
        this.thanhTien = ThanhTien;
    }

    // Getters and Setters
    public int getMaCTNK() {
        return maCTNK;
    }
    public void setMaCTNK(int maCTNK) {
        this.maCTNK = maCTNK;
    }
    public int getMaNK() {
        return maNK;
    }
    public void setMaNK(int maNK) {
        this.maNK = maNK;
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
    

}
