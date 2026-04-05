package com.example.ainative.ai.safety;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;
import org.junit.jupiter.api.Test;

class SafetyPolicyTest {

    @Test
    void shouldRejectHighRiskSql() {
        var policy = new SafetyPolicy(Set.of("sql-preview", "lookup"));

        assertThat(policy.isReadOnlySql("DROP TABLE orders")).isFalse();
        assertThat(policy.isReadOnlySql("DELETE FROM orders WHERE id = 1")).isFalse();
    }

    @Test
    void shouldRejectUnauthorizedToolName() {
        var policy = new SafetyPolicy(Set.of("sql-preview", "lookup"));

        assertThat(policy.isToolAllowed("write-db")).isFalse();
    }

    @Test
    void shouldAllowWhitelistedTool() {
        var policy = new SafetyPolicy(Set.of("sql-preview", "lookup"));

        assertThat(policy.isToolAllowed("lookup")).isTrue();
    }
}
