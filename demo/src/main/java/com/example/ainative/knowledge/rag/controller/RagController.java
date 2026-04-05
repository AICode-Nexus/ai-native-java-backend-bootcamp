package com.example.ainative.knowledge.rag.controller;

import com.example.ainative.common.api.ApiResponse;
import com.example.ainative.knowledge.rag.RagService;
import com.example.ainative.knowledge.rag.api.RagAnswerResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/knowledge")
public class RagController {

    private final RagService ragService;

    public RagController(RagService ragService) {
        this.ragService = ragService;
    }

    @PostMapping("/ask")
    public ApiResponse<RagAnswerResponse> ask(@Valid @RequestBody AskRequest request) {
        return ApiResponse.ok(ragService.answer(request.question()));
    }

    public record AskRequest(@NotBlank String question) {
    }
}
