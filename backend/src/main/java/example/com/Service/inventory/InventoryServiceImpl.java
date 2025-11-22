package example.com.Service.inventory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.com.Repository.ChiTietNhapKhoRepository;
import example.com.Repository.NhapKhoRepository;
import example.com.Repository.SanPhamRepository;
import example.com.model.CT_NhapKho;
import example.com.model.nhapkho;

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
    public nhapkho NhapKho(nhapkho phieu, List<CT_NhapKho> chitiets) {
        // lưu đơn nhập kho
        nhapkho savedPhieu = nhapKhoRepo.save(phieu);

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
}