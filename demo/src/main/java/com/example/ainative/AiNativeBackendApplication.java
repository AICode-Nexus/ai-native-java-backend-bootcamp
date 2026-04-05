package com.example.ainative;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AiNativeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiNativeBackendApplication.class, args);
    }
}
