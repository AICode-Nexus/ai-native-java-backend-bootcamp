package com.example.ainative.knowledge.retrieve;

import com.example.ainative.knowledge.document.service.DocumentIngestService;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Component;

public interface Retriever {

    List<RetrievedChunk> retrieve(String question);

    record RetrievedChunk(String chunkId, String sourceName, String content) {
    }
}

@Component
class InMemoryRetriever implements Retriever {

    private final DocumentIngestService documentIngestService;

    InMemoryRetriever(DocumentIngestService documentIngestService) {
        this.documentIngestService = documentIngestService;
    }

    @Override
    public List<RetrievedChunk> retrieve(String question) {
        var normalizedQuestion = question == null ? "" : question.toLowerCase(Locale.ROOT);
        var keywords = Arrays.stream(normalizedQuestion.split("\\W+"))
            .filter(token -> !token.isBlank())
            .filter(token -> token.length() > 1)
            .toList();

        return documentIngestService.getAllChunks().stream()
            .filter(chunk -> keywords.isEmpty() || containsAnyKeyword(chunk.content(), keywords))
            .limit(3)
            .map(chunk -> new RetrievedChunk(chunk.chunkId(), chunk.sourceName(), chunk.content()))
            .toList();
    }

    private static boolean containsAnyKeyword(String content, List<String> keywords) {
        var normalizedContent = content.toLowerCase(Locale.ROOT);
        return keywords.stream().anyMatch(normalizedContent::contains);
    }
}
