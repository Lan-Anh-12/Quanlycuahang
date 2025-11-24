package example.com.Dto;

import java.math.BigDecimal;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ThongKeDonHangRequest {
    private int soLuongKhach;
    private int soLuongDon;
    private BigDecimal tongDoanhThu;
}
