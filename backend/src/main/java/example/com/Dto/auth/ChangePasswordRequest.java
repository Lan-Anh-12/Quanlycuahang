package example.com.Dto.auth;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    private int maTK;
    private String mkCu;
    private String mkMoi;
}
