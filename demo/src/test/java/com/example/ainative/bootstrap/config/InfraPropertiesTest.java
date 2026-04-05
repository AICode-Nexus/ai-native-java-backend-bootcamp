package com.example.ainative.bootstrap.config;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.Configuration;

class InfraPropertiesTest {

    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
        .withUserConfiguration(TestConfig.class)
        .withPropertyValues(
            "app.ai.provider=openai",
            "app.redis.host=localhost",
            "app.mysql.host=localhost"
        );

    @Test
    void shouldBindAiAndDataInfraProperties() {
        contextRunner.run(context -> {
            assertThat(context).hasSingleBean(InfraProperties.class);

            var properties = context.getBean(InfraProperties.class);
            assertThat(properties.getAi().getProvider()).isEqualTo("openai");
            assertThat(properties.getRedis().getHost()).isEqualTo("localhost");
            assertThat(properties.getMysql().getHost()).isEqualTo("localhost");
        });
    }

    @Configuration(proxyBeanMethods = false)
    @EnableConfigurationProperties(InfraProperties.class)
    static class TestConfig {
    }
}
