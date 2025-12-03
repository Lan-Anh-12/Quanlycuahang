package example.com.Service.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.KhachHangRepository;
import example.com.model.KhachHang;
import example.com.Dto.khachhang.KhachHangRequest;
import example.com.Dto.khachhang.KhachHangResponse;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khRepo;


    // Helper

    private KhachHangResponse convertToResponse(KhachHang kh) {
        KhachHangResponse res = new KhachHangResponse();
        res.setMaKH(kh.getMaKH());
        res.setTenKH(kh.getTenKH());
        res.setNamSinh(kh.getNamSinh());
        res.setDiaChi(kh.getDiaChi());
        res.setSdt(kh.getsdt());
        return res;
    }

    private KhachHang convertToEntity(KhachHangRequest req) {
        KhachHang kh = new KhachHang();
        kh.setTenKH(req.getTenKH());
        kh.setNamSinh(req.getNamSinh());
        kh.setDiaChi(req.getDiaChi());
        kh.setsdt(req.getSdt());
        return kh;
    }


    // CRUD

    @Override
    @Transactional
    public KhachHangResponse taoKhachHang(KhachHangRequest req) {
        KhachHang kh = convertToEntity(req);
        KhachHang saved = khRepo.save(kh);
        return convertToResponse(saved);
    }

    @Override
    @Transactional
    public KhachHangResponse capNhatKhachHang(String maKH, KhachHangRequest req) {
        KhachHang kh = khRepo.findById(maKH)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        kh.setTenKH(req.getTenKH());
        kh.setNamSinh(req.getNamSinh());
        kh.setDiaChi(req.getDiaChi());
        kh.setsdt(req.getSdt());

        KhachHang updated = khRepo.save(kh);
        return convertToResponse(updated);
    }

    @Override
    public KhachHangResponse layKhachHangTheoMa(String maKH) {
        KhachHang kh = khRepo.findById(maKH)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
        return convertToResponse(kh);
    }

    @Override
    public List<KhachHangResponse> layTatCaKhachHang() {
        return khRepo.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Search

    @Override
    public List<KhachHangResponse> searchKhachHang(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();
        }

        return khRepo.searchByKeyword(keyword.trim())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}
