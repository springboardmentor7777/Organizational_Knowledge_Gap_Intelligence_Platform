package com.knowledgegap.controller;

import com.knowledgegap.dto.AIRecommendationResponse;
import com.knowledgegap.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIRecommendationController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/recommendation/{userId}")
    public List<AIRecommendationResponse> getRecommendations(
            @PathVariable Integer userId) {

        return geminiService.generateRecommendations(userId);
    }
}