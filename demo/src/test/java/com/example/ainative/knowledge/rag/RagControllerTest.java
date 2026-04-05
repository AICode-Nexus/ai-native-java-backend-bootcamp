package com.example.ainative.knowledge.rag;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.ainative.knowledge.citation.Citation;
import com.example.ainative.knowledge.rag.api.RagAnswerResponse;
import com.example.ainative.knowledge.rag.controller.RagController;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(RagController.class)
class RagControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RagService ragService;

    @Test
    void shouldReturnAnswerWithCitationsAndMode() throws Exception {
        when(ragService.answer(anyString())).thenReturn(new RagAnswerResponse(
            "grounded answer",
            List.of(new Citation("c1", "source.md", "chunk text")),
            "RAG"
        ));

        mockMvc.perform(post("/api/knowledge/ask")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"question\":\"What is this?\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.answer").value("grounded answer"))
            .andExpect(jsonPath("$.data.mode").value("RAG"))
            .andExpect(jsonPath("$.data.citations[0].sourceName").value("source.md"));
    }
}
