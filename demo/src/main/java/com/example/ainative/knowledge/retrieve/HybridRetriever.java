package com.example.ainative.knowledge.retrieve;

import com.example.ainative.search.KeywordSearchService;
import com.example.ainative.vector.VectorStoreGateway;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class HybridRetriever implements Retriever {

    private final KeywordSearchService keywordSearchService;
    private final VectorStoreGateway vectorStoreGateway;
    private final int limit;

    public HybridRetriever(
        KeywordSearchService keywordSearchService,
        VectorStoreGateway vectorStoreGateway,
        @Value("${app.retrieval.top-k:3}") int limit
    ) {
        this.keywordSearchService = keywordSearchService;
        this.vectorStoreGateway = vectorStoreGateway;
        this.limit = limit;
    }

    @Override
    public List<RetrievedChunk> retrieve(String question) {
        var merged = new LinkedHashMap<String, RetrievedChunk>();

        for (var chunk : safeKeywordSearch(question)) {
            merged.put(chunk.chunkId(), chunk);
        }

        for (var chunk : safeVectorSearch(question)) {
            merged.putIfAbsent(chunk.chunkId(), chunk);
        }

        return new ArrayList<>(merged.values()).stream()
            .limit(limit)
            .toList();
    }

    private List<RetrievedChunk> safeKeywordSearch(String question) {
        try {
            return keywordSearchService.search(question, limit);
        } catch (Exception exception) {
            return List.of();
        }
    }

    private List<RetrievedChunk> safeVectorSearch(String question) {
        try {
            return vectorStoreGateway.searchSimilar(question, limit);
        } catch (Exception exception) {
            return List.of();
        }
    }
}
