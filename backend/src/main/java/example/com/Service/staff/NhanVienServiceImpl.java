package example.com.Service.staff;

import example.com.Repository.LichSuDangNhapRepository;
import example.com.Repository.NhanVienRepository;
import example.com.Repository.TaiKhoanRepository;
import example.com.model.Lichsudangnhap;
import example.com.model.NhanVien;
import example.com.model.TaiKhoan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    
    @Autowired
    private NhanVienRepository nhanVienRepo;

    @Autowired
    private TaiKhoanRepository taiKhoanRepo;

    @Autowired
    private LichSuDangNhapRepository lichSuDangNhapRepo;

    @Override
    public List<NhanVien> layTatCa() {
        return nhanVienRepo.findAll();
    }

    @Override
    public NhanVien layTheoMa(int maNV) {
        return nhanVienRepo.findById(maNV)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên!"));
    }
    @Override
    public NhanVien taoNhanVien(NhanVien nv) {
        return nhanVienRepo.save(nv);
    }

    @Override
    @Transactional
    public NhanVien capNhatNhanVien(int maNV, NhanVien nvupdated) {
        NhanVien staff = layTheoMa(maNV);
        staff.setMaTK(nvupdated.getMaTK());
        staff.setEmail(nvupdated.getEmail());
        staff.setNgayVaoLam(nvupdated.getNgayVaoLam());
        staff.setSDT(nvupdated.getSDT());
        staff.setTenNV(nvupdated.getTenNV());
        return nhanVienRepo.save(staff);
    }

    @Override
    public void xoaNhanVien(int maNV) {
         nhanVienRepo.deleteById(maNV);
    }

    @Override
    public List<NhanVien> timTheoTen(String tenNV) {
        return nhanVienRepo.findByTenNVContaining(tenNV);
    }
    @Override
    @Transactional
    public void ganTaiKhoanChoNhanVien(int maNV, int maTK) {
        NhanVien nv = nhanVienRepo.findById(maNV)
            .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại: " + maNV));

        TaiKhoan tk = taiKhoanRepo.findById(maTK)
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại: " + maTK));

        nv.setTaiKhoan(tk);
        nhanVienRepo.save(nv);
    }

    @Override
    public List<Lichsudangnhap> layLichSuDangNhapNhanVien(int maNV) {
        NhanVien nv = nhanVienRepo.findById(maNV)
            .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại: " + maNV));

        if (nv.getTaiKhoan() == null) {
            throw new RuntimeException("Nhân viên chưa có tài khoản");
        }

        int maTK = nv.getTaiKhoan().getMaTK();
        return lichSuDangNhapRepo.findBymaTK(maTK);
}



}
