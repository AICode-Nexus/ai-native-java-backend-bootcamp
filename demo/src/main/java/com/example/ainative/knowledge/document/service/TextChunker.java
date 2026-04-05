package com.example.ainative.knowledge.document.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TextChunker {

    private final int chunkSize;
    private final int overlap;

    public TextChunker() {
        this(500, 50);
    }

    public TextChunker(int chunkSize, int overlap) {
        if (chunkSize <= 0) {
            throw new IllegalArgumentException("chunkSize must be positive");
        }
        if (overlap < 0 || overlap >= chunkSize) {
            throw new IllegalArgumentException("overlap must be between 0 and chunkSize - 1");
        }
        this.chunkSize = chunkSize;
        this.overlap = overlap;
    }

    public List<String> split(String text) {
        if (text == null || text.isBlank()) {
            return List.of();
        }

        var normalized = text.trim();
        if (normalized.length() <= chunkSize) {
            return List.of(normalized);
        }

        var chunks = new ArrayList<String>();
        var start = 0;

        while (start < normalized.length()) {
            var end = Math.min(start + chunkSize, normalized.length());
            chunks.add(normalized.substring(start, end));

            if (end >= normalized.length()) {
                break;
            }

            start = end - overlap;
        }

        return chunks;
    }
}
