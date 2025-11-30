package example.com.Service.inventory;

import java.util.List;
import example.com.model.CT_NhapKho;
import example.com.model.NhapKho;
import example.com.model.SanPham;



public interface InventoryService {
    
    public NhapKho NhapKho(NhapKho phieu, List<CT_NhapKho> chitiets );

    // Lấy danh sách phiếu nhập
    List<NhapKho> layTatCaPhieuNhap();

    // Lấy 1 phiếu nhập
    NhapKho layPhieuNhapTheoMa(int maNK);

    // Xóa phiếu nhập + trừ tồn kho tương ứng
    void xoaPhieuNhap(int maNK);

    // kiểm tra sản phẩm còn số lượng không
    int XemTonKho(int maSP);
    int kiemTraSoLuongSpTheoTen(String keyword);

    // sản phẩm còn bán
    List<SanPham> sanPhamConBan();
    // sản phẩm theo loại
    List<SanPham> sanPhamTheoLoai(String phanLoai);
    // lấy url theo mã
    String layUrlTheoMa(int maSp);

    // CRUD sản phẩm

    //tạo sản phẩm
    SanPham taoSanPhamMoi(SanPham sp);
    // xóa sản phẩm
    void xoaSanPham(int maSP);
    // cập nhật sản phẩm 
    SanPham capNhatSanPham(String tenSP, SanPham sp);

}
