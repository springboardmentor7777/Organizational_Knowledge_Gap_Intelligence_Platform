package com.knowledgegap.knowledgegapplatform.controller;

import com.knowledgegap.knowledgegapplatform.dto.RecommendationRequest;
import com.knowledgegap.knowledgegapplatform.dto.RecommendationResponse;
import com.knowledgegap.knowledgegapplatform.entity.Recommendation;
import com.knowledgegap.knowledgegapplatform.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    // Generate Recommendation
    @PostMapping("/generate")
    public RecommendationResponse generateRecommendation(@RequestBody RecommendationRequest request) {
        return recommendationService.generateRecommendation(request);
    }

    // Get Recommendations by Employee ID
    @GetMapping("/{employeeId}")
    public List<Recommendation> getRecommendations(@PathVariable Long employeeId) {
        return recommendationService.getRecommendationsByEmployeeId(employeeId);
    }
}