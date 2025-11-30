package example.com.Service.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Dto.donhang.ChiTietDonHangResponse;
import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Repository.ChiTietDonHangRepository;
import example.com.Repository.DonHangRepository;
import example.com.Repository.SanPhamRepository;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service // đánh dấu lớp này là một service trong Spring
@Transactional
public class DonHangServiceImpl implements DonHangService {

    @Autowired // tự động tiêm DonHangRepository
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;

    @Override
    public List<DonHang> layHetDonHang() {
        return donHangRepo.findAll();
    }

   @Override
@Transactional
public DonHangResponse TaoDonHang(DonHang donHang, List<CT_DonHang> chiTietDonHangs) {

    BigDecimal tongTien = BigDecimal.ZERO;

    // Auto set ngày lập
    if (donHang.getNgayLap() == null) {
        donHang.setNgayLap(LocalDateTime.now());
    }

    // Lưu đơn hàng trước để có mã DH
    DonHang saved = donHangRepo.save(donHang);

    List<ChiTietDonHangResponse> chiTietResponseList = new ArrayList<>();

    for (CT_DonHang ct : chiTietDonHangs) {

        BigDecimal giaSP = sanPhamRepo.findById(ct.getMaSP())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"))
            .getDonGia();

        BigDecimal thanhTien = giaSP.multiply(BigDecimal.valueOf(ct.getSoLuong()));

        ct.setMaDH(saved.getMaDH());
        ct.setDonGia(giaSP);
        ct.setThanhTien(thanhTien);

        CT_DonHang savedCT = chiTietDonHangRepo.save(ct);

        tongTien = tongTien.add(thanhTien);

        // giảm kho
        sanPhamRepo.tangSoLuong(ct.getMaSP(), -ct.getSoLuong());

        // map sang response
        ChiTietDonHangResponse ctRes = new ChiTietDonHangResponse();
        ctRes.setMaCTDH(savedCT.getMaCTDH());
        ctRes.setMaSP(savedCT.getMaSP());
        ctRes.setSoLuong(savedCT.getSoLuong());
        ctRes.setDonGia(savedCT.getDonGia());
        ctRes.setThanhTien(savedCT.getThanhTien());

        chiTietResponseList.add(ctRes);
    }

    // cập nhật tổng tiền
    saved.setTongTien(tongTien);
    donHangRepo.save(saved);

    // map sang response
    DonHangResponse res = new DonHangResponse();
    res.setMaDH(saved.getMaDH());
    res.setMaKH(saved.getMaKH());
    res.setMaNV(saved.getMaNV());
    res.setNgayLap(saved.getNgayLap());
    res.setTongTien(saved.getTongTien());
    res.setChiTiet(chiTietResponseList);

    return res;
}



    @Override
    public List<DonHang> LayDonHangTheoKhachHang(int maKH) {
        return donHangRepo.findByMaKH(maKH);
    }

    @Override
    public List<CT_DonHang> LayChiTietDonHangTheoDonHang(int maDH) {
        return chiTietDonHangRepo.findByMaDH(maDH);
    }

    @Override
    public List<DonHang> XemDonHangNVLap(int maNV) {
        return donHangRepo.findByMaNV(maNV);
    }
    @Override
    public List<DonHang> LayDonHangTheoKhoangNgay(LocalDateTime start, LocalDateTime end) {
        return donHangRepo.findByngayLapBetween(start, end);
    }
    @Override
    @Transactional
    public void XoaDonHang(int maDH) {
        // Xóa chi tiết trước
        chiTietDonHangRepo.deleteByMaDH(maDH);
        // Xóa đơn hàng
        donHangRepo.deleteById(maDH);
    }
    
     @Override
@Transactional
public DonHang CapNhatDonHang(DonHang donHang, List<CT_DonHang> ctDonHangs) {

    // Lấy đơn hàng cũ
    DonHang dh = donHangRepo.findById(donHang.getMaDH())
            .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

    // Update các thông tin cơ bản nếu FE gửi
    if (donHang != null) {
        dh.setNgayLap(donHang.getNgayLap());
        dh.setMaNV(donHang.getMaNV());
        dh.setMaKH(donHang.getMaKH());
    }

    BigDecimal tongTien = BigDecimal.ZERO;


    if (ctDonHangs != null && !ctDonHangs.isEmpty()) {

        // Lấy danh sách cũ
        List<CT_DonHang> ctOldList = chiTietDonHangRepo.findByMaDH(dh.getMaDH());

        List<Integer> newIds = ctDonHangs.stream()
                .filter(ct -> ct.getMaCTDH() > 0)
                .map(CT_DonHang::getMaCTDH)
                .toList();

        // Xóa chi tiết cũ không còn trong request
        for (CT_DonHang old : ctOldList) {
            if (!newIds.contains(old.getMaCTDH())) {
                chiTietDonHangRepo.delete(old);
            }
        }

        // Cập nhật hoặc thêm mới chi tiết
        for (CT_DonHang ct : ctDonHangs) {

            if (ct.getMaCTDH() >0) {
                ct.setDonHang(dh);
                chiTietDonHangRepo.save(ct);
                BigDecimal thanhTien = ct.getDonGia().multiply(BigDecimal.valueOf(ct.getSoLuong()));
                tongTien = tongTien.add(thanhTien);
            } else {
                CT_DonHang ctOld = chiTietDonHangRepo.findById(ct.getMaCTDH())
                .orElseThrow(() -> new RuntimeException("Chi tiết không tồn tại"));

                // cập nhật số lượng + đơn giá
                ctOld.setSoLuong(ct.getSoLuong());
                ctOld.setDonGia(ct.getDonGia());

                // tính thành tiền = donGia * soLuong
                BigDecimal thanhTien = ct.getDonGia()
                .multiply(BigDecimal.valueOf(ct.getSoLuong()));

                ctOld.setThanhTien(thanhTien);

                // cộng tổng tiền
                tongTien = tongTien.add(thanhTien);
            }
        }
    }

    // Cập nhật tổng tiền đơn hàng
    dh.setTongTien(tongTien);

    return donHangRepo.save(dh);
}


    

}
