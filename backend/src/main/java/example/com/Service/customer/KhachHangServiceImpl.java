package example.com.Service.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import example.com.Repository.KhachHangRepository;
import example.com.model.KhachHang;


@Service
public class  KhachHangServiceImpl implements  KhachHangService {

    @Autowired
    private KhachHangRepository khRepo;

    @Override
    public KhachHang taoKhachHang(KhachHang kh) {
        return khRepo.save(kh);
    }

    @Override
    public KhachHang capNhatKhachHang(int maKH, KhachHang updated) {
        KhachHang kh = khRepo.findById(maKH)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy KH"));

        kh.setTenKH(updated.getTenKH());
        kh.setNamSinh(updated.getNamSinh());
        kh.setDiaChi(updated.getDiaChi());
        kh.setDiemTichLuy(updated.getDiemTichLuy());

        return khRepo.save(kh);
    }


    @Override
    public KhachHang layKhachHangTheoMa(int maKH) {
        return khRepo.findById(maKH)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy KH"));
    }

    @Override
    public List<KhachHang> layTatCaKhachHang() {
        return khRepo.findAll();
    }

    @Override
    public List<KhachHang> timTheoTen(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return new ArrayList<>();
        }
        return khRepo.findByTenKHContainingIgnoreCase(keyword);
    }

    @Override
    public List<KhachHang> timTheoDiaChi(String diaChi) {
        return khRepo.findByDiaChi(diaChi);
    }

    @Override
    public List<KhachHang> timKhachHangTheoDiem(int minPoint) {
        return khRepo.findByDiemTichLuyGreaterThanEqual(minPoint);
    }

    
    
}
