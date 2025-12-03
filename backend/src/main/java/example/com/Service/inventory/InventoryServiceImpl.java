package example.com.Service.inventory;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.ChiTietNhapKhoRepository;
import example.com.Repository.NhapKhoRepository;
import example.com.Repository.SanPhamRepository;

import example.com.model.CT_NhapKho;
import example.com.model.NhapKho;
import example.com.model.SanPham;

import example.com.Dto.khohang.NhapKhoRequest;
import example.com.Dto.khohang.CT_NhapKhoRequest;
import example.com.Dto.khohang.NhapKhoResponse;
import example.com.Dto.khohang.CT_NhapKhoResponse;
import example.com.Dto.sanpham.SanPhamRequest;
import example.com.Dto.sanpham.SanPhamResponse;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private ChiTietNhapKhoRepository chiTietNhapKhoRepo;

    @Autowired
    private NhapKhoRepository nhapKhoRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;

    private CT_NhapKhoResponse mapCTEntityToResp(CT_NhapKho ct) {
        CT_NhapKhoResponse r = new CT_NhapKhoResponse();
        r.setMaCTNK(ct.getMaCTNK());
        r.setMaSP(ct.getMaSP());
        r.setTenSP(sanPhamRepo.findTenSPByMaSP(ct.getMaSP()));
        r.setSoLuong(ct.getSoLuong());
        r.setDonGia(ct.getDonGia());
        r.setThanhTien(ct.getDonGia().multiply(BigDecimal.valueOf(ct.getSoLuong())));
        return r;
    }

    private NhapKhoResponse mapPhieuEntityToResp(NhapKho ph) {
        NhapKhoResponse r = new NhapKhoResponse();
        r.setMaNK(ph.getMaNK());
        r.setMaNV(ph.getMaNV());
        r.setNhaCungCap(ph.getNhaCungCap());
        r.setNgayNhap(ph.getNgayNhap());
        
        List<CT_NhapKho> cts = chiTietNhapKhoRepo.findByMaNK(ph.getMaNK());
        List<CT_NhapKhoResponse> ctResp = cts.stream()
            .map(this::mapCTEntityToResp)
            .collect(Collectors.toList());
        r.setChiTiet(ctResp);
        BigDecimal tong = ctResp.stream()
            .map(ct -> ct.getThanhTien())
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        r.setTongTien(tong);
        return r;
    }

    private SanPhamResponse mapSanPhamToResp(SanPham sp) {
        SanPhamResponse r = new SanPhamResponse();
        r.setMaSP(sp.getMaSP());
        r.setTenSP(sp.getTenSP());
        r.setPhanLoai(sp.getPhanLoai());
        r.setGiaBan(sp.getDonGia());
        r.setSoLuongTon(sp.getSoLuongTon());
        r.setUrlAnh(sp.getUrl());
        r.setMoTa(sp.getMoTa());
        return r;
    }


    @Override
    public int xemTonKho(String maSP) {
        return sanPhamRepo.getSoLuongByMaSP(maSP);
    }

    @Override
    @Transactional
    public NhapKhoResponse nhapKho(NhapKhoRequest request) {
        // create NhapKho entity
        NhapKho phieu = new NhapKho();
        phieu.setMaNV(request.getMaNV());
        phieu.setNhaCungCap(request.getNhaCungCap());
        phieu.setNgayNhap(request.getNgayNhap() == null ? LocalDateTime.now() : request.getNgayNhap());

        // save phieu to get id
        NhapKho savedPhieu = nhapKhoRepo.save(phieu);

        BigDecimal tongTien = BigDecimal.ZERO;
        List<CT_NhapKho> savedCTs = new ArrayList<>();

        for (CT_NhapKhoRequest ctReq : request.getChiTiet()) {
            // kiểm tra sản phẩm tồn tại 
            SanPham sp = sanPhamRepo.findById(ctReq.getMaSP())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại: " + ctReq.getMaSP()));

            // tạo chi tiết nhập kho
            CT_NhapKho ct = new CT_NhapKho();
            ct.setMaNK(savedPhieu.getMaNK());
            ct.setMaSP(ctReq.getMaSP());
            ct.setSoLuong(ctReq.getSoLuong());
            // set don gia nhập: nếu không có thì lấy giá bán hiện tại
            ct.setDonGia(ctReq.getDonGia() == null ? sp.getDonGia() : ctReq.getDonGia());
            ct.setThanhTien(ct.getDonGia().multiply(BigDecimal.valueOf(ct.getSoLuong())));

            CT_NhapKho savedCT = chiTietNhapKhoRepo.save(ct);
            savedCTs.add(savedCT);

            // cập nhật tồn kho
            int updated = sanPhamRepo.tangSoLuong(ct.getMaSP(), ct.getSoLuong());
            if (updated == 0) {
                throw new RuntimeException("Không tìm thấy sản phẩm với mã: " + ct.getMaSP());
            }

            tongTien = tongTien.add(ct.getThanhTien());
        }

        // cập nhật tổng tiền, lưu
        savedPhieu.setTongTien(tongTien);
        nhapKhoRepo.save(savedPhieu);

        return mapPhieuEntityToResp(savedPhieu);
    }

    @Override
    public List<NhapKhoResponse> layTatCaPhieuNhap() {
        List<NhapKho> all = nhapKhoRepo.findAll();
        return all.stream().map(this::mapPhieuEntityToResp).collect(Collectors.toList());
    }

    @Override
    public NhapKhoResponse layPhieuNhapTheoMa(String maNK) {
        NhapKho ph = nhapKhoRepo.findById(maNK)
            .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại: " + maNK));
        return mapPhieuEntityToResp(ph);
    }

    @Override
    @Transactional
    public void xoaPhieuNhap(String maNK) {
        NhapKho phieu = nhapKhoRepo.findById(maNK)
                .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại: " + maNK));

        List<CT_NhapKho> chiTiets = chiTietNhapKhoRepo.findByMaNK(maNK);

        for (CT_NhapKho ct : chiTiets) {
            // giảm tồn kho tương ứng (trừ đi lượng đã nhập)
            sanPhamRepo.tangSoLuong(ct.getMaSP(), -ct.getSoLuong());
        }

        chiTietNhapKhoRepo.deleteAll(chiTiets);
        nhapKhoRepo.delete(phieu);
    }

    @Override
    public int kiemTraSoLuongSpTheoTen(String keyword) {
        return sanPhamRepo.getSoLuongByTenSP(keyword);
    }

    @Override
    public List<SanPhamResponse> sanPhamConBan() {
        return sanPhamRepo.findAllNonDeleted().stream()
            .map(this::mapSanPhamToResp)
            .collect(Collectors.toList());
    }
    @Override
    public List<SanPhamResponse> searchSanPham(String keyword) {
    return sanPhamRepo.searchByKeyword(keyword).stream()
            .map(this::mapSanPhamToResp)
            .collect(Collectors.toList());
}



    @Override
    public String layUrlTheoMa(String maSp) {
        return sanPhamRepo.findUrlByMaSP(maSp);
    }

    @Override
    @Transactional
    public SanPhamResponse taoSanPhamMoi(SanPhamRequest spReq) {
        SanPham sp = new SanPham();
        sp.setTenSP(spReq.getTenSP());
        sp.setPhanLoai(spReq.getPhanLoai());
        sp.setDonGia(spReq.getGiaBan());
        sp.setSoLuongTon(spReq.getSoLuong() == null ? 0 : spReq.getSoLuong());
        sp.setUrl(spReq.getUrlHinh());
        sp.setMoTa(spReq.getMoTa());
        SanPham saved = sanPhamRepo.save(sp);
        return mapSanPhamToResp(saved);
    }

    @Override
    @Transactional
    public void xoaSanPham(String maSP) {
        sanPhamRepo.softDelete(maSP);
    }

    // cập nhật sp
    @Override
    @Transactional
    public SanPhamResponse capNhatSanPham(String maSP, SanPhamRequest spReq) {
        SanPham sp = sanPhamRepo.findByMaSP(maSP)
            .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
        sp.setTenSP(spReq.getTenSP());
        sp.setDonGia(spReq.getGiaBan());
        sp.setMoTa(spReq.getMoTa());
        sp.setSoLuongTon(spReq.getSoLuong());
        SanPham saved = sanPhamRepo.save(sp);
        return mapSanPhamToResp(saved);
    }
    @Override
    public List<NhapKhoResponse> layTheoMaNKOrNCC(String keyword) {
        List<NhapKho> phieuNhaps = nhapKhoRepo.findByMaNKOrNhaCungCap(keyword);
        return phieuNhaps.stream()
                .map(this::mapPhieuEntityToResp)
                .collect(Collectors.toList());
    }
}
