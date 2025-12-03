package example.com.model.khoachinh; // package tùy bạn đặt

import java.util.concurrent.atomic.AtomicInteger;

public class CTDHIdGenerator {

    private static AtomicInteger counter = new AtomicInteger(0);

    public static String generateNextId() {
        int next = counter.incrementAndGet();
        return String.format("CTDH%06d", next); // CTDH000001, CTDH000002, ...
    }
}
