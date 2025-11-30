package example.com.Service.inventory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.ChiTietNhapKhoRepository;
import example.com.Repository.NhapKhoRepository;
import example.com.Repository.SanPhamRepository;

import example.com.model.CT_NhapKho;
import example.com.model.NhapKho;
import example.com.model.SanPham;

@Service
public class InventoryServiceImpl implements InventoryService {
    
    @Autowired
    private ChiTietNhapKhoRepository chiTietNhapKhoRepo;

    @Autowired
    private NhapKhoRepository nhapKhoRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;


    @Override
    public int XemTonKho(int maSP) {
        return sanPhamRepo.getSoLuongByMaSP( maSP);
    }
    
    @Override
    @Transactional
    public NhapKho NhapKho(NhapKho phieu, List<CT_NhapKho> chitiets) {
        // lưu đơn nhập kho
        NhapKho savedPhieu = nhapKhoRepo.save(phieu);

        for( CT_NhapKho ct : chitiets) {
            int ma_phieu = savedPhieu.getMaNK();
            ct.setMaNK(ma_phieu);
            chiTietNhapKhoRepo.save(ct);

            int row = sanPhamRepo.tangSoLuong(ct.getMaSP(), ct.getSoLuong());
            if (row == 0) {
                throw new RuntimeException(
                    "Không tìm thấy sản phẩm với mã: " + ct.getMaSP()
                );
            }
        }
        return savedPhieu;
    }
    
    // Lấy danh sách phiếu nhập
    @Override
    public List<NhapKho> layTatCaPhieuNhap() {
        return nhapKhoRepo.findAll();
    }

    // Lấy 1 phiếu nhập theo mã
    @Override
    public NhapKho layPhieuNhapTheoMa(int maNK) {
        return nhapKhoRepo.findById(maNK)
                .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại: " + maNK));
    }

    // Xóa phiếu nhập + trừ tồn kho tương ứng
    @Override
    @Transactional
    public void xoaPhieuNhap(int maNK) {
        NhapKho phieu = nhapKhoRepo.findById(maNK)
                .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại: " + maNK));

        // Lấy chi tiết phiếu nhập
        List<CT_NhapKho> chiTiets = chiTietNhapKhoRepo.findByMaNK(maNK);

        // Trừ tồn kho các sản phẩm trong phiếu
        for (CT_NhapKho ct : chiTiets) {
            SanPham sp = sanPhamRepo.findById(ct.getMaSP())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại: " + ct.getMaSP()));

            int newSoLuong = sp.getSoLuongTon() - ct.getSoLuong();
            if (newSoLuong < 0) newSoLuong = 0; // không để tồn < 0
            sp.setSoLuongTon(newSoLuong);

            sanPhamRepo.save(sp);
        }

        // Xóa chi tiết phiếu nhập
        chiTietNhapKhoRepo.deleteAll(chiTiets);

        // Xóa phiếu nhập
        nhapKhoRepo.delete(phieu);
    }
   
    @Override
    public int kiemTraSoLuongSpTheoTen(String keyword) {
        return sanPhamRepo.getSoLuongByTenSP(keyword);
    }

    @Override
    public List<SanPham> sanPhamConBan() {
        return sanPhamRepo.findAllNonDeleted();
    }
    @Override
    public List<SanPham> sanPhamTheoLoai(String phanLoai) {
        return sanPhamRepo.findByPhanLoai(phanLoai);
    }
    @Override
    public String layUrlTheoMa(int maSp) {
        return sanPhamRepo.findUrlByMaSP(maSp);
    }
    @Override
    public SanPham taoSanPhamMoi(SanPham sp) {
        return sanPhamRepo.save(sp);
    }
    @Override
    public void xoaSanPham(int maSP) {
        sanPhamRepo.softDelete(maSP);
    }
    @Override
    public SanPham capNhatSanPham(String tenSP, SanPham spham) {
        SanPham sp = sanPhamRepo.findBytenSP(tenSP)
        .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        sp.setTenSP(spham.getTenSP());
        sp.setDonGia(spham.getDonGia());
        sp.setMoTa(spham.getMoTa());
        sp.setSoLuongTon(spham.getSoLuongTon());
        sp.setTrangThai(spham.getTrangThai());

        return sanPhamRepo.save(sp);

    }

}