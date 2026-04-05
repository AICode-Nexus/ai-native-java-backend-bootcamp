package com.example.ainative.chat.service;

import com.example.ainative.ai.model.ChatModelGateway;
import com.example.ainative.chat.api.ChatRequest;
import com.example.ainative.chat.api.ChatResponse;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ChatService {

    private final ChatModelGateway chatModelGateway;

    public ChatService(ChatModelGateway chatModelGateway) {
        this.chatModelGateway = chatModelGateway;
    }

    public ChatResponse chat(ChatRequest request) {
        var completion = chatModelGateway.chat(request.message());
        return new ChatResponse(completion.answer(), completion.model());
    }

    public Flux<String> stream(ChatRequest request) {
        return chatModelGateway.stream(request.message());
    }
}
