package com.example.ainative.agent.tool;

import com.example.ainative.agent.executor.ToolExecutionResult;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class ToolRegistry {

    private final Set<String> allowlist;
    private final Map<String, ToolDefinition> tools = new LinkedHashMap<>();

    public ToolRegistry() {
        this(Set.of());
    }

    public ToolRegistry(Set<String> allowlist) {
        this.allowlist = Set.copyOf(allowlist);
    }

    public void register(ToolDefinition toolDefinition) {
        if (tools.containsKey(toolDefinition.name())) {
            throw new IllegalArgumentException("Tool '%s' is already registered".formatted(toolDefinition.name()));
        }
        tools.put(toolDefinition.name(), toolDefinition);
    }

    public ToolExecutionResult execute(String toolName, String input) {
        var toolDefinition = tools.get(toolName);
        if (toolDefinition == null) {
            return ToolExecutionResult.failure("TOOL_NOT_FOUND", "Tool '%s' is not registered".formatted(toolName));
        }

        if (!allowlist.isEmpty() && !allowlist.contains(toolName)) {
            return ToolExecutionResult.failure("TOOL_NOT_ALLOWED", "Tool '%s' is outside allowlist".formatted(toolName));
        }

        return toolDefinition.executor().apply(input);
    }
}
