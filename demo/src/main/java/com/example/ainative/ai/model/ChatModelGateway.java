package com.example.ainative.ai.model;

import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

public interface ChatModelGateway {

    ChatCompletion chat(String message);

    Flux<String> stream(String message);

    record ChatCompletion(String answer, String model) {
    }
}

@Component
class StubChatModelGateway implements ChatModelGateway {

    @Override
    public ChatCompletion chat(String message) {
        return new ChatCompletion("stub-answer: " + message, "stub-model");
    }

    @Override
    public Flux<String> stream(String message) {
        return Flux.just("stub", "answer", message);
    }
}
