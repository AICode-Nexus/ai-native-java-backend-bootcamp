package com.example.ainative.dataassistant.controller;

import com.example.ainative.common.api.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data-assistant")
public class SqlAssistantController {

    @PostMapping("/sql")
    public ApiResponse<SqlAssistantResponse> preview(@Valid @RequestBody SqlAssistantRequest request) {
        ensureReadOnlyQuestion(request.question());

        return ApiResponse.ok(new SqlAssistantResponse(
            buildSqlPreview(request.question()),
            true,
            "只返回只读 SQL 预览，默认仍需人工审核后执行。"
        ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException exception) {
        var error = new LinkedHashMap<String, Object>();
        error.put("code", "READ_ONLY_REQUIRED");
        error.put("message", exception.getMessage());

        var body = new LinkedHashMap<String, Object>();
        body.put("success", false);
        body.put("error", error);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    private static void ensureReadOnlyQuestion(String question) {
        var normalized = question.toLowerCase(Locale.ROOT);
        var forbiddenKeywords = new String[] {"delete", "drop", "truncate", "update", "insert", "删除", "修改", "清空"};

        for (var keyword : forbiddenKeywords) {
            if (normalized.contains(keyword)) {
                throw new IllegalArgumentException("Only read-only analytical questions are allowed");
            }
        }
    }

    private static String buildSqlPreview(String question) {
        if (question.contains("最近7天") || question.toLowerCase(Locale.ROOT).contains("7")) {
            return "SELECT COUNT(*) AS order_count FROM orders WHERE created_at >= CURRENT_DATE - INTERVAL 7 DAY;";
        }

        return "SELECT * FROM orders LIMIT 20;";
    }

    public record SqlAssistantRequest(@NotBlank String question) {
    }

    public record SqlAssistantResponse(String sqlPreview, boolean safe, String summary) {
    }
}
