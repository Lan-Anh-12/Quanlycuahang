package example.com.Service.inventory;

import java.util.List;
import example.com.model.CT_NhapKho;
import example.com.model.nhapkho;
import example.com.model.sanpham;


public interface InventoryService {
    public int XemTonKho(int maSP);
    public nhapkho NhapKho(nhapkho phieu, List<CT_NhapKho> chitiets );


}
