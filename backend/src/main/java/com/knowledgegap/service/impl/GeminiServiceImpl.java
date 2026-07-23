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

            String recommendation = callGemini(prompt);

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