package example.com.Service.staff;

import java.util.List;

import example.com.model.Lichsudangnhap;
import example.com.model.NhanVien;


public interface NhanVienService {

    List<NhanVien> layTatCa();
    NhanVien layTheoMa(int maNV);
    NhanVien taoNhanVien(NhanVien nv);
    NhanVien capNhatNhanVien(int maNV, NhanVien nv);
    void xoaNhanVien(int maNV);
    List<NhanVien> timTheoTen(String tenNV);

     // Gán tài khoản cho nhân viên
    void ganTaiKhoanChoNhanVien(int maNV, int maTK);

    // Lịch sử đăng nhập nhân viên
    List<Lichsudangnhap> layLichSuDangNhapNhanVien(int maNV);
    
}
