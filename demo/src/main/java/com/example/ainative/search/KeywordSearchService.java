package com.example.ainative.search;

import com.example.ainative.knowledge.document.service.DocumentIngestService;
import com.example.ainative.knowledge.retrieve.Retriever;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Component;

public interface KeywordSearchService {

    List<Retriever.RetrievedChunk> search(String question, int limit);
}

@Component
class InMemoryKeywordSearchService implements KeywordSearchService {

    private final DocumentIngestService documentIngestService;

    InMemoryKeywordSearchService(DocumentIngestService documentIngestService) {
        this.documentIngestService = documentIngestService;
    }

    @Override
    public List<Retriever.RetrievedChunk> search(String question, int limit) {
        var normalizedQuestion = question == null ? "" : question.toLowerCase(Locale.ROOT);
        var keywords = Arrays.stream(normalizedQuestion.split("\\W+"))
            .filter(token -> !token.isBlank())
            .filter(token -> token.length() > 1)
            .toList();

        return documentIngestService.getAllChunks().stream()
            .filter(chunk -> keywords.isEmpty() || containsAnyKeyword(chunk.content(), keywords))
            .limit(limit)
            .map(chunk -> new Retriever.RetrievedChunk(chunk.chunkId(), chunk.sourceName(), chunk.content()))
            .toList();
    }

    private static boolean containsAnyKeyword(String content, List<String> keywords) {
        var normalizedContent = content.toLowerCase(Locale.ROOT);
        return keywords.stream().anyMatch(normalizedContent::contains);
    }
}
