package com.example.ainative.knowledge.rag.api;

import com.example.ainative.knowledge.citation.Citation;
import java.util.List;

public record RagAnswerResponse(String answer, List<Citation> citations, String mode) {
}
