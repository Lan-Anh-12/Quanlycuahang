package example.com.Dto.donhang;


import java.math.BigDecimal;
import lombok.Data;

@Data
public class ChiTietDonHangResponse {
    private Integer maCTDH;
    private Integer maSP;
    private Integer soLuong;
    private BigDecimal donGia;
    private BigDecimal thanhTien;
}
