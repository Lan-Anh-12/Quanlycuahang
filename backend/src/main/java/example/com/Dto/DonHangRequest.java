package example.com.Dto;
import java.util.List;

import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import lombok.Data;

@Data
public class DonHangRequest {
    private DonHang donHang;
    private List<CT_DonHang> chiTietDonHangs;
    
    
}
