package example.com.Service.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import example.com.Repository.KhachHangRepository;
import example.com.model.khachhang;


@Service
public class  KhachHangServiceImpl implements  KhachHangService {

    @Autowired
    private KhachHangRepository khRepo;

    @Override
    public khachhang taoKhachHang(khachhang kh) {
        return khRepo.save(kh);
    }

    @Override
    public khachhang capNhatKhachHang(int maKH, khachhang updated) {
        khachhang kh = khRepo.findById(maKH)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy KH"));

        kh.setTenKH(updated.getTenKH());
        kh.setNamSinh(updated.getNamSinh());
        kh.setDiaChi(updated.getDiaChi());
        kh.setDiemTichLuy(updated.getDiemTichLuy());

        return khRepo.save(kh);
    }

    @Override
    public void xoaKhachHang(int maKH) {
        khRepo.deleteById(maKH);
    }

    @Override
    public khachhang layKhachHangTheoMa(int maKH) {
        return khRepo.findById(maKH)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy KH"));
    }

    @Override
    public List<khachhang> layTatCaKhachHang() {
        return khRepo.findAll();
    }

    @Override
    public List<khachhang> timTheoTen(String ten) {
        return khRepo.findByTenKH(ten);
    }

    @Override
    public List<khachhang> timTheoDiaChi(String diaChi) {
        return khRepo.findByDiaChi(diaChi);
    }

    @Override
    public List<khachhang> timKhachHangTheoDiem(int minPoint) {
        return khRepo.findByDiemTichLuyGreaterThanEqual(minPoint);
    }

    
    
}
