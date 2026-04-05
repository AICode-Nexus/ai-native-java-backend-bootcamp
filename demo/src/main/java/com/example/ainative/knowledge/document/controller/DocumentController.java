package com.example.ainative.knowledge.document.controller;

import com.example.ainative.common.api.ApiResponse;
import com.example.ainative.knowledge.document.api.UploadDocumentResponse;
import com.example.ainative.knowledge.document.service.DocumentIngestService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentIngestService documentIngestService;

    public DocumentController(DocumentIngestService documentIngestService) {
        this.documentIngestService = documentIngestService;
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<UploadDocumentResponse> upload(@RequestPart("file") MultipartFile file) {
        var result = documentIngestService.ingest(file);
        return ApiResponse.ok(new UploadDocumentResponse(
            result.documentId(),
            result.chunkCount(),
            result.status()
        ));
    }
}
