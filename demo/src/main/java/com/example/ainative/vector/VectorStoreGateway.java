package com.example.ainative.vector;

import com.example.ainative.knowledge.retrieve.Retriever;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

public interface VectorStoreGateway {

    void upsert(List<VectorDocument> documents);

    List<Retriever.RetrievedChunk> searchSimilar(String question, int limit);

    record VectorDocument(String chunkId, String sourceName, String content) {
    }
}

@Component
class InMemoryVectorStoreGateway implements VectorStoreGateway {

    private final ConcurrentHashMap<String, VectorDocument> storage = new ConcurrentHashMap<>();

    @Override
    public void upsert(List<VectorDocument> documents) {
        documents.forEach(document -> storage.put(document.chunkId(), document));
    }

    @Override
    public List<Retriever.RetrievedChunk> searchSimilar(String question, int limit) {
        var normalizedQuestion = question == null ? "" : question.toLowerCase(Locale.ROOT);

        return storage.values().stream()
            .filter(document -> score(normalizedQuestion, document.content()) > 0)
            .sorted(Comparator.comparingInt((VectorDocument document) -> score(normalizedQuestion, document.content())).reversed())
            .limit(limit)
            .map(document -> new Retriever.RetrievedChunk(document.chunkId(), document.sourceName(), document.content()))
            .toList();
    }

    private static int score(String question, String content) {
        var normalizedContent = content.toLowerCase(Locale.ROOT);
        var tokens = question.split("\\W+");
        var score = 0;

        for (var token : tokens) {
            if (!token.isBlank() && token.length() > 1 && normalizedContent.contains(token)) {
                score++;
            }
        }

        return score;
    }
}
