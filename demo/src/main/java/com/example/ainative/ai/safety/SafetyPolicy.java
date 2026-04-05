package com.example.ainative.ai.safety;

import java.util.Locale;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class SafetyPolicy {

    private final Set<String> allowedTools;

    public SafetyPolicy() {
        this(Set.of("lookup", "sql-preview"));
    }

    public SafetyPolicy(Set<String> allowedTools) {
        this.allowedTools = Set.copyOf(allowedTools);
    }

    public boolean isReadOnlySql(String sql) {
        var normalized = sql.trim().toLowerCase(Locale.ROOT);
        if (normalized.isBlank()) {
            return false;
        }

        var blockedKeywords = new String[] {"drop ", "delete ", "truncate ", "update ", "insert ", "alter ", "create ", "grant "};
        for (var keyword : blockedKeywords) {
            if (normalized.contains(keyword)) {
                return false;
            }
        }

        return normalized.startsWith("select")
            || normalized.startsWith("with")
            || normalized.startsWith("show")
            || normalized.startsWith("explain");
    }

    public boolean isToolAllowed(String toolName) {
        return allowedTools.contains(toolName);
    }
}
