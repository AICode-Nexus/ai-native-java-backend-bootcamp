package com.example.ainative.dataassistant.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SqlAssistantController.class)
class SqlAssistantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnReadOnlySqlPreview() throws Exception {
        mockMvc.perform(post("/api/data-assistant/sql")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"question\":\"统计最近7天订单数\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.safe").value(true))
            .andExpect(jsonPath("$.data.sqlPreview").value(org.hamcrest.Matchers.startsWith("SELECT")))
            .andExpect(jsonPath("$.data.summary").isNotEmpty());
    }

    @Test
    void shouldRejectNonReadOnlyQuestion() throws Exception {
        mockMvc.perform(post("/api/data-assistant/sql")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"question\":\"删除订单表里的测试数据\"}"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.success").value(false))
            .andExpect(jsonPath("$.error.code").value("READ_ONLY_REQUIRED"));
    }
}
