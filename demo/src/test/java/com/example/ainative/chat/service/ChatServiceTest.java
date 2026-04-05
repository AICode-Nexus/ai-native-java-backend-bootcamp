package com.example.ainative.chat.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.ainative.ai.model.ChatModelGateway;
import com.example.ainative.chat.api.ChatRequest;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;

class ChatServiceTest {

    @Test
    void shouldReturnSynchronousChatResponse() {
        var service = new ChatService(new StubChatModelGateway());

        var response = service.chat(new ChatRequest("hello"));

        assertThat(response.answer()).isEqualTo("stub-answer: hello");
        assertThat(response.model()).isEqualTo("stub-model");
    }

    @Test
    void shouldExposeStreamingChatChunks() {
        var service = new ChatService(new StubChatModelGateway());

        var chunks = service.stream(new ChatRequest("hello")).collectList().block();

        assertThat(chunks).containsExactly("stub", "answer", "hello");
    }

    private static final class StubChatModelGateway implements ChatModelGateway {

        @Override
        public ChatCompletion chat(String message) {
            return new ChatCompletion("stub-answer: " + message, "stub-model");
        }

        @Override
        public Flux<String> stream(String message) {
            return Flux.just("stub", "answer", message);
        }
    }
}
