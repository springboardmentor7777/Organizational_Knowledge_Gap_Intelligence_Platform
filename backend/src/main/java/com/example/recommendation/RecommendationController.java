package com.example.recommendation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Recommendation;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Recommendation>> getRecommendations(@PathVariable Long employeeId) {
        return ResponseEntity.ok(recommendationService.getRecommendationsByEmployeeId(employeeId));
    }

    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<Recommendation>> getHistory(@PathVariable Long employeeId) {
        return ResponseEntity.ok(recommendationService.getRecommendationHistory(employeeId));
    }

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<String> generate(@PathVariable Long employeeId) {
        recommendationService.generateRecommendationsForEmployee(employeeId);
        return ResponseEntity.ok("Recommendations generated for " + employeeId);
    }

    // Add this new endpoint
    @PostMapping("/refresh/{employeeId}")
    public ResponseEntity<String> refresh(@PathVariable Long employeeId) {
        recommendationService.refreshRecommendations(employeeId);
        return ResponseEntity.ok("Recommendations refreshed for " + employeeId);
    }
}