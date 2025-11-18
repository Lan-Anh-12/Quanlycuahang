package example.com.model;

import java.math.BigDecimal;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "nhapkho")
public class nhapkho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNK")
    private int maNK;

    @Column(name = "MaNV")
    private int maNV; // Foreign key to nhanvien

    @Column(name = "NhaCungCap")
    private String nhaCungCap;
    @Column(name = "TongTien")
    private BigDecimal tongTien;

    @OneToMany(mappedBy = "nhapKho", cascade = CascadeType.ALL)
    private java.util.List<CT_NhapKho> chiTietNhapKhos;

    public nhapkho() {}

    public nhapkho( int MaNK, int MaNV, String NhaCungCap, BigDecimal TongTien) {
        
        this.maNK = MaNK;
        this.maNV = MaNV;
        this.nhaCungCap = NhaCungCap;
        this.tongTien = TongTien;
    }
    // Getters and Setters
    public int getMaNK() {
        return maNK;
    }
    public void setMaNK(int maNK) {
        this.maNK = maNK;
    }
    public java.util.List<CT_NhapKho> getChiTietNhapKhos() {
        return chiTietNhapKhos;
    }
    public void setChiTietNhapKhos(List<CT_NhapKho> chiTietNhapKhos) {
        this.chiTietNhapKhos = chiTietNhapKhos;
    }
    public int getMaNV() {
        return maNV;
    }
    public void setMaNV(int maNV) {
        this.maNV = maNV;
    }
    public String getNhaCungCap() {
        return nhaCungCap;
    }
    public void setNhaCungCap(String nhaCungCap) {
        this.nhaCungCap = nhaCungCap;
    }
    public BigDecimal getTongTien() {
        return tongTien;
    }
    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }

}
