package com.example.ainative.knowledge.document.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class TextChunkerTest {

    @Test
    void shouldSplitLongTextIntoStableChunks() {
        var chunker = new TextChunker(50, 10);
        var text = "0123456789".repeat(15);

        var chunks = chunker.split(text);

        assertThat(chunks).hasSizeGreaterThan(1);
        assertThat(chunks).allMatch(chunk -> chunk.length() <= 50);
        assertThat(chunks.get(1)).startsWith(chunks.get(0).substring(chunks.get(0).length() - 10));
    }
}
