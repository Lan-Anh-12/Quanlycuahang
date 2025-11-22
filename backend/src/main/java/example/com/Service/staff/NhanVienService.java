package example.com.Service.staff;

import java.util.List;
import example.com.model.nhanvien;


public interface NhanVienService {

    List<nhanvien> layTatCa();
    nhanvien layTheoMa(int maNV);
    nhanvien taoNhanVien(nhanvien nv);
    nhanvien capNhatNhanVien(int maNV, nhanvien nv);
    void xoaNhanVien(int maNV);
    List<nhanvien> timTheoTen(String tenNV);
    
}
