package com.example.ainative.knowledge.document.service;

import com.example.ainative.knowledge.document.model.DocumentChunk;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentIngestService {

    private final TextChunker textChunker;
    private final ConcurrentHashMap<String, List<DocumentChunk>> storage = new ConcurrentHashMap<>();

    public DocumentIngestService(TextChunker textChunker) {
        this.textChunker = textChunker;
    }

    public IngestResult ingest(MultipartFile file) {
        var fileName = file.getOriginalFilename() == null ? "document.txt" : file.getOriginalFilename();
        validateSupportedFile(fileName);

        var documentId = "doc-" + UUID.randomUUID();
        var content = readContent(file);
        var chunks = textChunker.split(content);
        var documentChunks = buildChunks(documentId, fileName, chunks);

        storage.put(documentId, documentChunks);
        return new IngestResult(documentId, documentChunks.size(), "RECEIVED");
    }

    public List<DocumentChunk> getChunks(String documentId) {
        return storage.getOrDefault(documentId, List.of());
    }

    public List<DocumentChunk> getAllChunks() {
        return storage.values().stream()
            .flatMap(List::stream)
            .toList();
    }

    private static void validateSupportedFile(String fileName) {
        if (!(fileName.endsWith(".txt") || fileName.endsWith(".md"))) {
            throw new IllegalArgumentException("Only .txt and .md files are supported in the current lesson");
        }
    }

    private static String readContent(MultipartFile file) {
        try {
            return new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to read uploaded file", exception);
        }
    }

    private static List<DocumentChunk> buildChunks(String documentId, String fileName, List<String> chunks) {
        var documentChunks = new java.util.ArrayList<DocumentChunk>();
        for (int index = 0; index < chunks.size(); index++) {
            documentChunks.add(new DocumentChunk(
                documentId,
                documentId + "-chunk-" + index,
                fileName,
                index,
                chunks.get(index)
            ));
        }
        return List.copyOf(documentChunks);
    }

    public record IngestResult(String documentId, int chunkCount, String status) {
    }
}
