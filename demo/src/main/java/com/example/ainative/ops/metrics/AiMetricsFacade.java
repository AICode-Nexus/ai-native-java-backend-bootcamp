package com.example.ainative.ops.metrics;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Component;

@Component
public class AiMetricsFacade {

    private final AtomicLong totalRequests = new AtomicLong();
    private final AtomicLong totalTokens = new AtomicLong();
    private final AtomicLong cacheHits = new AtomicLong();
    private final ConcurrentHashMap<String, AtomicLong> latencies = new ConcurrentHashMap<>();

    public void recordModelCall(String modelName, long tokens, long latencyMs) {
        totalRequests.incrementAndGet();
        totalTokens.addAndGet(tokens);
        latencies.computeIfAbsent(modelName, ignored -> new AtomicLong()).addAndGet(latencyMs);
    }

    public void recordCacheHit(String cacheName) {
        cacheHits.incrementAndGet();
        latencies.computeIfAbsent("cache:" + cacheName, ignored -> new AtomicLong()).incrementAndGet();
    }

    public Map<String, Long> snapshot() {
        var snapshot = new ConcurrentHashMap<String, Long>();
        snapshot.put("totalRequests", totalRequests.get());
        snapshot.put("totalTokens", totalTokens.get());
        snapshot.put("cacheHits", cacheHits.get());
        latencies.forEach((key, value) -> snapshot.put(key, value.get()));
        return Map.copyOf(snapshot);
    }
}
