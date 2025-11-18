package example.com.Dto;
import java.util.List;

import example.com.model.CT_DonHang;
import example.com.model.DonHang;

public class TaoDonHangRequest {
    private DonHang donHang;
    private List<CT_DonHang> chiTietDonHangs;
    public DonHang getDonHang() {
        return donHang;
    }
    public void setDonHang(DonHang donHang) {
        this.donHang = donHang;
    }
    public List<CT_DonHang> getChiTietDonHangs() {
        return chiTietDonHangs;
    }
    public void setChiTietDonHangs(List<CT_DonHang> chiTietDonHangs) {
        this.chiTietDonHangs = chiTietDonHangs;
    }
    
}
