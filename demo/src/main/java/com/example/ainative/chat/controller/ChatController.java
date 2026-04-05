package com.example.ainative.chat.controller;

import com.example.ainative.chat.api.ChatRequest;
import com.example.ainative.chat.api.ChatResponse;
import com.example.ainative.chat.service.ChatService;
import com.example.ainative.common.api.ApiResponse;
import jakarta.validation.Valid;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ApiResponse<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        return ApiResponse.ok(chatService.chat(request));
    }

    @PostMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<StreamingResponseBody> stream(@Valid @RequestBody ChatRequest request) {
        StreamingResponseBody responseBody = outputStream -> {
            try (var writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
                chatService.stream(request)
                    .doOnNext(chunk -> writeChunk(writer, chunk))
                    .blockLast();
                writer.flush();
            }
        };

        return ResponseEntity.ok()
            .contentType(MediaType.TEXT_EVENT_STREAM)
            .body(responseBody);
    }

    private static void writeChunk(OutputStreamWriter writer, String chunk) {
        try {
            writer.write("data:" + chunk + "\n\n");
            writer.flush();
        } catch (Exception exception) {
            throw new IllegalStateException("Failed to write streaming response", exception);
        }
    }
}
