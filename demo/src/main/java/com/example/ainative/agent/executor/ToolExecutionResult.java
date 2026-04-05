package com.example.ainative.agent.executor;

public record ToolExecutionResult(
    boolean success,
    String output,
    String errorCode,
    String errorMessage
) {

    public static ToolExecutionResult success(String output) {
        return new ToolExecutionResult(true, output, null, null);
    }

    public static ToolExecutionResult failure(String errorCode, String errorMessage) {
        return new ToolExecutionResult(false, null, errorCode, errorMessage);
    }
}
