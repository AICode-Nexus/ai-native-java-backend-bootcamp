package com.example.ainative.knowledge.rag;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.ainative.ai.model.ChatModelGateway;
import com.example.ainative.knowledge.retrieve.Retriever;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;

class RagServiceTest {

    @Test
    void shouldReturnAnswerWithCitations() {
        Retriever retriever = question -> java.util.List.of(
            new Retriever.RetrievedChunk("c1", "source.md", "chunk text")
        );
        ChatModelGateway model = new StubChatModelGateway("grounded answer");
        var service = new RagService(retriever, model);

        var response = service.answer("What is this?");

        assertThat(response.answer()).isEqualTo("grounded answer");
        assertThat(response.citations()).hasSize(1);
        assertThat(response.citations().get(0).sourceName()).isEqualTo("source.md");
        assertThat(response.mode()).isEqualTo("RAG");
    }

    @Test
    void shouldFallbackWhenRetrieverReturnsNothing() {
        Retriever retriever = question -> java.util.List.of();
        ChatModelGateway model = new FailingChatModelGateway();
        var service = new RagService(retriever, model);

        var response = service.answer("What is this?");

        assertThat(response.answer()).contains("No relevant knowledge found");
        assertThat(response.citations()).isEmpty();
        assertThat(response.mode()).isEqualTo("NO_KNOWLEDGE");
    }

    private static final class StubChatModelGateway implements ChatModelGateway {

        private final String answer;

        private StubChatModelGateway(String answer) {
            this.answer = answer;
        }

        @Override
        public ChatCompletion chat(String message) {
            return new ChatCompletion(answer, "rag-stub-model");
        }

        @Override
        public Flux<String> stream(String message) {
            return Flux.just(answer);
        }
    }

    private static final class FailingChatModelGateway implements ChatModelGateway {

        @Override
        public ChatCompletion chat(String message) {
            throw new AssertionError("chat model should not be called when no citations are available");
        }

        @Override
        public Flux<String> stream(String message) {
            throw new AssertionError("stream should not be called in this test");
        }
    }
}
