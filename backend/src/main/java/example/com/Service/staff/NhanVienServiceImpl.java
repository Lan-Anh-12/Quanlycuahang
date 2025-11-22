package example.com.Service.staff;

import example.com.Repository.NhanVienRepository;
import example.com.model.nhanvien;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    
    @Autowired
    private NhanVienRepository nhanVienRepo;

    @Override
    public List<nhanvien> layTatCa() {
        return nhanVienRepo.findAll();
    }

    @Override
    public nhanvien layTheoMa(int maNV) {
        return nhanVienRepo.findById(maNV)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên!"));
    }
    @Override
    public nhanvien taoNhanVien(nhanvien nv) {
        return nhanVienRepo.save(nv);
    }

    @Override
    @Transactional
    public nhanvien capNhatNhanVien(int maNV, nhanvien nv) {
        nhanvien staff = layTheoMa(maNV);
        staff.setMaTK(nv.getMaTK());
        staff.setEmail(nv.getEmail());
        staff.setNgayVaoLam(nv.getNgayVaoLam());
        staff.setSDT(nv.getSDT());
        staff.setTenNV(nv.getTenNV());
        return nhanVienRepo.save(staff);
    }

    @Override
    public void xoaNhanVien(int maNV) {
         nhanVienRepo.deleteById(maNV);
    }

    @Override
    public List<nhanvien> timTheoTen(String tenNV) {
        return nhanVienRepo.findByTenNVContaining(tenNV);
    }
    


}
