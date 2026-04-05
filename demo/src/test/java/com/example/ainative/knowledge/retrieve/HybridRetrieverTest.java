package com.example.ainative.knowledge.retrieve;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.ainative.search.KeywordSearchService;
import com.example.ainative.vector.VectorStoreGateway;
import com.example.ainative.vector.VectorStoreGateway.VectorDocument;
import java.util.List;
import org.junit.jupiter.api.Test;

class HybridRetrieverTest {

    @Test
    void shouldMergeKeywordAndVectorResults() {
        KeywordSearchService keywordSearchService = (question, limit) -> List.of(
            new Retriever.RetrievedChunk("k1", "keyword.md", "keyword result")
        );
        VectorStoreGateway vectorStoreGateway = new StubVectorStoreGateway(List.of(
            new Retriever.RetrievedChunk("k1", "keyword.md", "keyword result"),
            new Retriever.RetrievedChunk("v1", "vector.md", "vector result")
        ));
        var retriever = new HybridRetriever(keywordSearchService, vectorStoreGateway, 5);

        var chunks = retriever.retrieve("hello");

        assertThat(chunks).containsExactly(
            new Retriever.RetrievedChunk("k1", "keyword.md", "keyword result"),
            new Retriever.RetrievedChunk("v1", "vector.md", "vector result")
        );
    }

    @Test
    void shouldFallbackToVectorResultsWhenKeywordSearchFails() {
        KeywordSearchService keywordSearchService = (question, limit) -> {
            throw new IllegalStateException("keyword unavailable");
        };
        VectorStoreGateway vectorStoreGateway = new StubVectorStoreGateway(List.of(
            new Retriever.RetrievedChunk("v1", "vector.md", "vector result")
        ));
        var retriever = new HybridRetriever(keywordSearchService, vectorStoreGateway, 5);

        var chunks = retriever.retrieve("hello");

        assertThat(chunks).containsExactly(
            new Retriever.RetrievedChunk("v1", "vector.md", "vector result")
        );
    }

    @Test
    void shouldFallbackToKeywordResultsWhenVectorSearchFails() {
        KeywordSearchService keywordSearchService = (question, limit) -> List.of(
            new Retriever.RetrievedChunk("k1", "keyword.md", "keyword result")
        );
        VectorStoreGateway vectorStoreGateway = new FailingVectorStoreGateway();
        var retriever = new HybridRetriever(keywordSearchService, vectorStoreGateway, 5);

        var chunks = retriever.retrieve("hello");

        assertThat(chunks).containsExactly(
            new Retriever.RetrievedChunk("k1", "keyword.md", "keyword result")
        );
    }

    private static final class StubVectorStoreGateway implements VectorStoreGateway {

        private final List<Retriever.RetrievedChunk> chunks;

        private StubVectorStoreGateway(List<Retriever.RetrievedChunk> chunks) {
            this.chunks = chunks;
        }

        @Override
        public void upsert(List<VectorDocument> documents) {
        }

        @Override
        public List<Retriever.RetrievedChunk> searchSimilar(String question, int limit) {
            return chunks;
        }
    }

    private static final class FailingVectorStoreGateway implements VectorStoreGateway {

        @Override
        public void upsert(List<VectorDocument> documents) {
        }

        @Override
        public List<Retriever.RetrievedChunk> searchSimilar(String question, int limit) {
            throw new IllegalStateException("vector unavailable");
        }
    }
}
