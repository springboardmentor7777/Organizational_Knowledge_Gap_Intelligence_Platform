package com.orgkgi.recommendation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.orgkgi.entity.Recommendation;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recommendations")
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

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody Map<String, Long> body) {
        Long employeeId = body.get("employeeId");
        recommendationService.generateRecommendationsForEmployee(employeeId);
        return ResponseEntity.ok("Recommendations generated for " + employeeId);
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(@RequestBody Map<String, Long> body) {
        Long employeeId = body.get("employeeId");
        recommendationService.refreshRecommendations(employeeId);
        return ResponseEntity.ok("Recommendations refreshed for " + employeeId);
    }
}