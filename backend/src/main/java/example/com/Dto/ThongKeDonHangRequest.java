package example.com.Dto;

import java.math.BigDecimal;


public class ThongKeDonHangRequest {
    private int soLuongKhach;
    private int soLuongDon;
    private BigDecimal tongDoanhThu;
    
    public ThongKeDonHangRequest( int soLuongKhach, int soLuongDon, BigDecimal tongDoanhThu) {
        this.soLuongKhach = soLuongKhach;
        this.soLuongDon = soLuongDon;
        this.tongDoanhThu = tongDoanhThu;

    }
    public int getSoLuongKhach() {
        return soLuongKhach;
    }
    public int getTongDon() {
        return soLuongDon;
    }
    public BigDecimal getTongDoanhThu() {
        return tongDoanhThu;
    }
}
