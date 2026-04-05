package com.example.ainative.chat.api;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(@NotBlank String message) {
}
