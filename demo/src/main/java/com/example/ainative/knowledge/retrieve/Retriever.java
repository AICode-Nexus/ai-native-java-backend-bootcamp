package com.example.ainative.knowledge.retrieve;

import java.util.List;

public interface Retriever {

    List<RetrievedChunk> retrieve(String question);

    record RetrievedChunk(String chunkId, String sourceName, String content) {
    }
}
