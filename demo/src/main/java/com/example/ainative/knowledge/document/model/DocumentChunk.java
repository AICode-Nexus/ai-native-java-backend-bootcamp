package com.example.ainative.knowledge.document.model;

public record DocumentChunk(
    String documentId,
    String chunkId,
    String sourceName,
    int sequence,
    String content
) {
}
