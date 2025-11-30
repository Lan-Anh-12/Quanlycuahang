package example.com.Dto.donhang;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
import lombok.Data;


// Dùng cho danh sách đơn hàng

@Data
public class DonHangResponse {
    private Integer maDH;
    private Integer maKH;
    private Integer maNV;
    private LocalDateTime ngayLap;
    private BigDecimal tongTien;

    private List<ChiTietDonHangResponse> chiTiet;

}


