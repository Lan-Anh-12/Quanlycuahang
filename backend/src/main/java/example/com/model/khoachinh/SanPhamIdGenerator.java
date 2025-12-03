package example.com.model.khoachinh;

import java.util.concurrent.atomic.AtomicInteger;

public class SanPhamIdGenerator {
    private static AtomicInteger counter = new AtomicInteger(0);

    public static String generateNextId() {
        int next = counter.incrementAndGet();
        return String.format("SP%06d", next);
    }
}
