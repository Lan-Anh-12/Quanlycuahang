package example.com.Service.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Dto.donhang.ChiTietDonHangResponse;
import example.com.Dto.donhang.DonHangRequest;
import example.com.Dto.donhang.DonHangResponse;
import example.com.Dto.donhang.CapNhatDonHangRequest;
import example.com.Dto.donhang.ChiTietDonHangRequest;
import example.com.Dto.donhang.CapNhatDonHangRequest;

import example.com.Repository.ChiTietDonHangRepository;
import example.com.Repository.DonHangRepository;
import example.com.Repository.SanPhamRepository;
import example.com.Repository.KhachHangRepository;
import example.com.model.CT_DonHang;
import example.com.model.DonHang;
import example.com.model.KhachHang;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service // đánh dấu lớp này là một service trong Spring
@Transactional
public class DonHangServiceImpl implements DonHangService {

    @Autowired // tự động tiêm DonHangRepository
    private DonHangRepository donHangRepo;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;

    @Autowired
    private KhachHangRepository khachHangRepo;

    private DonHangResponse mapToResponse(DonHang dh) {
        DonHangResponse res = new DonHangResponse();
        res.setMaDH(dh.getMaDH());
        res.setMaKH(dh.getMaKH());
        res.setMaNV(dh.getMaNV());
        res.setNgayLap(dh.getNgayLap());
        res.setTongTien(dh.getTongTien());

        // map chi tiết đơn hàng
        List<CT_DonHang> chiTietList = chiTietDonHangRepo.findByMaDH(dh.getMaDH());
        List<ChiTietDonHangResponse> chiTietResp = chiTietList.stream()
            .map(ct -> {
                ChiTietDonHangResponse ctRes = new ChiTietDonHangResponse();
                ctRes.setMaCTDH(ct.getMaCTDH());
                ctRes.setMaSP(ct.getMaSP());
                ctRes.setSoLuong(ct.getSoLuong());
                ctRes.setDonGia(ct.getDonGia());
                ctRes.setThanhTien(ct.getThanhTien());
                return ctRes;
            })
            .collect(Collectors.toList());

        res.setChiTiet(chiTietResp);

        return res;
    }

    @Override
    public List<DonHangResponse> layHetDonHang() {
        List<DonHang> list = donHangRepo.findAll();

        return list.stream().map(this::mapToResponse).toList();
}


   @Override
@Transactional
public DonHangResponse TaoDonHang(DonHangRequest request) {
    BigDecimal tongTien = BigDecimal.ZERO;
    String maKH = request.getMaKH();

    //  Xử lý khách hàng
    KhachHang khachHang;
    if (maKH == null) {
        // khách mới
        khachHang = new KhachHang();
        khachHang.setTenKH(request.getTenKH()); // FE gửi tên
        khachHang.setNamSinh(request.getNamSinh());
        khachHang.setDiaChi(request.getDiaChi());
        khachHang = khachHangRepo.save(khachHang);
        maKH = khachHang.getMaKH();
    } else {
        khachHang = khachHangRepo.findById(maKH)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
    }

    //  Tạo đơn hàng
    DonHang donHang = new DonHang();
    donHang.setMaKH(maKH);
    donHang.setMaNV(request.getMaNV());
    donHang.setNgayLap(LocalDateTime.now());
    DonHang savedDH = donHangRepo.save(donHang);

    //  Tạo chi tiết đơn hàng
    List<ChiTietDonHangResponse> chiTietRespList = new ArrayList<>();
    for (ChiTietDonHangRequest ctReq : request.getChiTietDonHangs()) {
        BigDecimal donGia = sanPhamRepo.findById(ctReq.getMaSP())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"))
                .getDonGia();
        BigDecimal thanhTien = donGia.multiply(BigDecimal.valueOf(ctReq.getSoLuong()));

        CT_DonHang ct = new CT_DonHang();
        ct.setMaDH(savedDH.getMaDH());
        ct.setMaSP(ctReq.getMaSP());
        ct.setSoLuong(ctReq.getSoLuong());
        ct.setDonGia(donGia);
        ct.setThanhTien(thanhTien);

        chiTietDonHangRepo.save(ct);

        tongTien = tongTien.add(thanhTien);

        // giảm kho
        sanPhamRepo.tangSoLuong(ctReq.getMaSP(), -ctReq.getSoLuong());

        // map sang response
        ChiTietDonHangResponse ctRes = new ChiTietDonHangResponse();
        ctRes.setMaCTDH(ct.getMaCTDH());
        ctRes.setMaSP(ct.getMaSP());
        ctRes.setSoLuong(ct.getSoLuong());
        ctRes.setDonGia(ct.getDonGia());
        ctRes.setThanhTien(ct.getThanhTien());
        chiTietRespList.add(ctRes);
    }

    //  Cập nhật tổng tiền đơn hàng
    savedDH.setTongTien(tongTien);
    donHangRepo.save(savedDH);

   
    khachHangRepo.save(khachHang);

    //  Trả response
    DonHangResponse res = new DonHangResponse();
    res.setMaDH(savedDH.getMaDH());
    res.setMaKH(savedDH.getMaKH());
    res.setMaNV(savedDH.getMaNV());
    res.setNgayLap(savedDH.getNgayLap());
    res.setTongTien(savedDH.getTongTien());
    res.setChiTiet(chiTietRespList);

    return res;
}


    @Override
    public List<DonHangResponse> LayDonHangTheoKhachHang(String maKH) {
        List<DonHang> donHangs = donHangRepo.findByMaKH(maKH);
        return donHangs.stream()
                   .map(this::mapToResponse)
                   .collect(Collectors.toList());
    }


    @Override
    public List<ChiTietDonHangResponse> LayChiTietDonHangTheoDonHang(String maDH) {
        List<CT_DonHang> chiTietList = chiTietDonHangRepo.findByMaDH(maDH);
        return chiTietList.stream()
                .map(ct -> {
                    ChiTietDonHangResponse ctRes = new ChiTietDonHangResponse();
                    ctRes.setMaCTDH(ct.getMaCTDH());
                    ctRes.setMaSP(ct.getMaSP());
                    ctRes.setSoLuong(ct.getSoLuong());
                    ctRes.setDonGia(ct.getDonGia());
                    ctRes.setThanhTien(ct.getThanhTien());
                    return ctRes;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<DonHangResponse> XemDonHangNVLap(String maNV) {
        return donHangRepo.findByMaNV(maNV).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Override
    public List<DonHangResponse> LayDonHangTheoKhoangNgay(LocalDateTime start, LocalDateTime end) {
        return donHangRepo.findByNgayLapBetween(start, end).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    
     @Override
    @Transactional
    public DonHangResponse CapNhatDonHang(CapNhatDonHangRequest request) {
        DonHang dh = donHangRepo.findById(request.getMaDH())
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

        BigDecimal tongTien = BigDecimal.ZERO;

        List<CT_DonHang> chiTietCu = chiTietDonHangRepo.findByMaDH(dh.getMaDH());

        for (ChiTietDonHangRequest ctReq : request.getChiTiet()) {
            CT_DonHang ctCu = chiTietCu.stream()
                    .filter(ct -> ct.getMaSP().equals(ctReq.getMaSP()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Chi tiết sản phẩm không tồn tại"));

            int delta = ctCu.getSoLuong() - ctReq.getSoLuong(); // dương = trả hàng, âm = mua thêm
            sanPhamRepo.tangSoLuong(ctCu.getMaSP(), delta);

            ctCu.setSoLuong(ctReq.getSoLuong());
            ctCu.setThanhTien(ctCu.getDonGia().multiply(BigDecimal.valueOf(ctReq.getSoLuong())));
            chiTietDonHangRepo.save(ctCu);

            tongTien = tongTien.add(ctCu.getThanhTien());
        }

        dh.setTongTien(tongTien);
        donHangRepo.save(dh);

        return mapToResponse(dh);
    }


@Override
public List<DonHangResponse> searchDonHang(String keyword) {
    if (keyword == null || keyword.trim().isEmpty()) {
        return List.of();
    }

    // Gọi repository
    List<DonHang> donHangs = donHangRepo.searchByKeyword(keyword.trim());

    return donHangs.stream()
                   .map(this::mapToResponse)
                   .collect(Collectors.toList());
}



    

}
