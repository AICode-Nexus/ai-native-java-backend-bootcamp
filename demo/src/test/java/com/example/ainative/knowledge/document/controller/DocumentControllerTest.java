package com.example.ainative.knowledge.document.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.ainative.knowledge.document.service.DocumentIngestService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(DocumentController.class)
class DocumentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentIngestService documentIngestService;

    @Test
    void shouldAcceptMarkdownUploadAndReturnDocumentId() throws Exception {
        var file = new MockMultipartFile(
            "file",
            "knowledge.md",
            "text/markdown",
            "# Title\nHello AI-native backend".getBytes()
        );

        when(documentIngestService.ingest(any())).thenReturn(
            new DocumentIngestService.IngestResult("doc-123", 2, "RECEIVED")
        );

        mockMvc.perform(multipart("/api/documents/upload").file(file))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.documentId").value("doc-123"))
            .andExpect(jsonPath("$.data.chunkCount").value(2))
            .andExpect(jsonPath("$.data.status").value("RECEIVED"));
    }
}
