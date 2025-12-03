package example.com.model.khoachinh;

import java.util.concurrent.atomic.AtomicInteger;

public class CTNKIdGenerator {

    private static AtomicInteger counter = new AtomicInteger(0);

    public static String generateNextId() {
        int next = counter.incrementAndGet();
        return String.format("CTNK%06d", next);
    }
}
