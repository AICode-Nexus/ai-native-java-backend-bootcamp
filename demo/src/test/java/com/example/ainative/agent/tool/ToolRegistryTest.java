package com.example.ainative.agent.tool;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.example.ainative.agent.executor.ToolExecutionResult;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ToolRegistryTest {

    @Test
    void shouldRegisterUniqueToolAndExecuteIt() {
        var registry = new ToolRegistry(Set.of("lookup"));
        registry.register(new ToolDefinition("lookup", input -> ToolExecutionResult.success("ok:" + input)));

        var result = registry.execute("lookup", "hello");

        assertThat(result.success()).isTrue();
        assertThat(result.output()).isEqualTo("ok:hello");
    }

    @Test
    void shouldRejectDuplicateToolRegistration() {
        var registry = new ToolRegistry(Set.of("lookup"));
        registry.register(new ToolDefinition("lookup", input -> ToolExecutionResult.success("ok")));

        assertThatThrownBy(() -> registry.register(
            new ToolDefinition("lookup", input -> ToolExecutionResult.success("duplicate"))
        )).isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("already registered");
    }

    @Test
    void shouldReturnExplicitErrorForUnknownTool() {
        var registry = new ToolRegistry(Set.of("lookup"));

        var result = registry.execute("missing", "hello");

        assertThat(result.success()).isFalse();
        assertThat(result.errorCode()).isEqualTo("TOOL_NOT_FOUND");
    }

    @Test
    void shouldBlockToolOutsideAllowlist() {
        var registry = new ToolRegistry(Set.of("lookup"));
        registry.register(new ToolDefinition("write-db", input -> ToolExecutionResult.success("danger")));

        var result = registry.execute("write-db", "hello");

        assertThat(result.success()).isFalse();
        assertThat(result.errorCode()).isEqualTo("TOOL_NOT_ALLOWED");
    }
}
