package com.example.ainative.agent.tool;

import com.example.ainative.agent.executor.ToolExecutionResult;
import java.util.function.Function;

public record ToolDefinition(String name, Function<String, ToolExecutionResult> executor) {
}
