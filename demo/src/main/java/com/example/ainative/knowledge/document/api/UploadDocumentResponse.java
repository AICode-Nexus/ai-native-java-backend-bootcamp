package com.example.ainative.knowledge.document.api;

public record UploadDocumentResponse(String documentId, int chunkCount, String status) {
}
