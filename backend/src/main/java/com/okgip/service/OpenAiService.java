package com.okgip.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@SuppressWarnings("null")
public class OpenAiService {
    private static final Logger logger = LoggerFactory.getLogger(OpenAiService.class);
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    @Value("${app.openai.api-key:}")
    private String apiKey;

    @Value("${app.openai.model:gpt-4o-mini}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateRecommendationRationale(String userName, String skillName, Integer gapScore, String courseTitle) {
        if (apiKey == null || apiKey.trim().isEmpty() || "YOUR_OPENAI_API_KEY".equalsIgnoreCase(apiKey.trim())) {
            logger.info("OpenAI API key not configured. Using internal AI rule-engine rationale.");
            return generateFallbackRationale(userName, skillName, gapScore, courseTitle);
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey.trim());

            String prompt = String.format(
                "You are an AI Organizational Skill Intelligence Advisor. Generate a concise 2-sentence rationale explaining why " +
                "the employee '%s' should take the course '%s' to close a gap score of %d in the competency '%s'. Focus on career growth and business impact.",
                userName, courseTitle, gapScore, skillName
            );

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            
            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> sysMsg = new HashMap<>();
            sysMsg.put("role", "system");
            sysMsg.put("content", "You are an AI talent intelligence expert. Be professional, concise, and direct.");
            messages.add(sysMsg);

            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", prompt);
            messages.add(userMsg);

            requestBody.put("messages", messages);
            requestBody.put("max_tokens", 150);
            requestBody.put("temperature", 0.7);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List choices = (List) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map firstChoice = (Map) choices.get(0);
                    Map message = (Map) firstChoice.get("message");
                    if (message != null && message.get("content") != null) {
                        return message.get("content").toString().trim();
                    }
                }
            }
        } catch (Exception e) {
            logger.warn("OpenAI API call failed ({}), falling back to internal AI engine.", e.getMessage());
        }

        return generateFallbackRationale(userName, skillName, gapScore, courseTitle);
    }

    private String generateFallbackRationale(String userName, String skillName, Integer gapScore, String courseTitle) {
        return String.format(
            "AI Insights for %s: We detected a gap score of %d in '%s'. " +
            "The course '%s' is recommended because its curriculum directly targets this proficiency. " +
            "Completing this course is estimated to eliminate this gap and align your skills with departmental benchmarks.",
            userName, gapScore, skillName, courseTitle
        );
    }
}
