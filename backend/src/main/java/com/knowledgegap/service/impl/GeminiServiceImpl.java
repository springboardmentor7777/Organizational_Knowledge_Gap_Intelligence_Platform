package com.knowledgegap.service.impl;

import com.google.gson.*;
import com.knowledgegap.dto.AIRecommendationResponse;
import com.knowledgegap.dto.GapAnalysisResponse;
import com.knowledgegap.service.GapAnalysisService;
import com.knowledgegap.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Override
    public List<AIRecommendationResponse> generateRecommendations(Integer userId) {

        List<GapAnalysisResponse> gaps =
                gapAnalysisService.analyzeEmployee(userId);

        List<AIRecommendationResponse> responses =
                new ArrayList<>();

        for (GapAnalysisResponse gap : gaps) {

            if (gap.getGap() <= 0)
                continue;

            String prompt =
                    "You are an IT skill advisor. " +
                    "Employee Name: " + gap.getEmployeeName() + ". " +
                    "Skill: " + gap.getSkillName() + ". " +
                    "Current Level: " + gap.getCurrentLevel() + ". " +
                    "Expected Level: " + gap.getExpectedLevel() + ". " +
                    "Gap: " + gap.getGap() + ". " +
                    "Recommend learning topics, projects and certifications in 80 words.";

            String recommendation;
            if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("dummy_api_key")) {
                recommendation = getFallbackRecommendation(gap.getSkillName(), gap.getGap());
            } else {
                try {
                    recommendation = callGemini(prompt);
                    if (recommendation == null || recommendation.trim().isEmpty() || recommendation.contains("API key not valid")) {
                        recommendation = getFallbackRecommendation(gap.getSkillName(), gap.getGap());
                    }
                } catch (Exception e) {
                    recommendation = getFallbackRecommendation(gap.getSkillName(), gap.getGap());
                }
            }

            AIRecommendationResponse response =
                    new AIRecommendationResponse();

            response.setUserId(gap.getUserId());
            response.setEmployeeName(gap.getEmployeeName());
            response.setSkillName(gap.getSkillName());
            response.setGap(gap.getGap());
            response.setRecommendation(recommendation);

            responses.add(response);
        }

        return responses;
    }

    private String getFallbackRecommendation(String skillName, int gap) {
        switch (skillName) {
            case "Java":
                return "Focus on Java 17/21 features (Records, Pattern Matching), Streams API, and multithreading. We recommend enrolling in Java Programming Masterclass on Udemy. Practical Exercise: Build a multi-threaded data processing pipeline using ExecutorService.";
            case "Spring Boot":
                return "Deep dive into Spring Security (JWT, OAuth2), Spring Cloud Config, and JPA performance optimization (solving N+1 query problems). We recommend Spring Boot Microservices on Udemy. Practical Exercise: Create a reactive microservice with Spring WebFlux.";
            case "React":
                return "Master React Hooks (useMemo, useCallback, custom hooks), state management with Redux Toolkit or Context API, and code-splitting. We recommend React - The Complete Guide on Udemy. Practical Exercise: Optimize render performance on a data-intensive dashboard.";
            case "Docker":
                return "Learn multi-stage builds, volume mounting, docker-compose orchestration, and container networking. We recommend Docker and Kubernetes: The Complete Guide on Udemy. Practical Exercise: Containerize a full-stack Spring-React app.";
            case "Kubernetes":
                return "Understand Kubernetes Pods, Deployments, Services, Ingress controllers, and Helm charts. We recommend Kubernetes Certified Application Developer (CKAD) on Udemy. Practical Exercise: Deploy a microservices app with HPA (Horizontal Pod Autoscaler).";
            case "SQL":
                return "Focus on advanced joins, subqueries, indexing strategies, transaction isolation levels, and query optimization. We recommend The Complete SQL Bootcamp on Udemy. Practical Exercise: Rewrite a slow query using EXPLAIN ANALYZE.";
            case "System Design":
                return "Study distributed caching, load balancing, database sharding, rate limiting, and CAP theorem. We recommend System Design Interview by ByteByteGo. Practical Exercise: Design a scalable notification system or a URL shortener.";
            default:
                return "Enhance proficiency in " + skillName + " by completing related coursework, contributing to hands-on repositories, and building simple sandbox applications to practice core APIs and frameworks.";
        }
    }

    private String callGemini(String prompt) {

    String url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
        + apiKey;

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    JsonObject body = new JsonObject();

    JsonArray contents = new JsonArray();

    JsonObject content = new JsonObject();

    JsonArray parts = new JsonArray();

    JsonObject part = new JsonObject();
    part.addProperty("text", prompt);

    parts.add(part);

    content.add("parts", parts);

    contents.add(content);

    body.add("contents", contents);

    HttpEntity<String> entity =
            new HttpEntity<>(body.toString(), headers);

    try {

        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        String.class);

        System.out.println(response.getBody());

        JsonObject json =
                JsonParser.parseString(response.getBody())
                        .getAsJsonObject();

        return json
                .getAsJsonArray("candidates")
                .get(0)
                .getAsJsonObject()
                .getAsJsonObject("content")
                .getAsJsonArray("parts")
                .get(0)
                .getAsJsonObject()
                .get("text")
                .getAsString();

    } catch (Exception e) {
    e.printStackTrace();
    return e.getMessage();
}
}
}