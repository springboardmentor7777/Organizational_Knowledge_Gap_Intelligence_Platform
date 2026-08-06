package com.okgip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class KnowledgeGapPlatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(KnowledgeGapPlatformApplication.class, args);
    }
}
