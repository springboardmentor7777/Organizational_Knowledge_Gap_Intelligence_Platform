package org.example.controller;

import org.example.dto.RecommendationResponse;
import org.example.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/employee/{employeeId}")
    public List<RecommendationResponse> getRecommendations(
            @PathVariable Long employeeId) {

        return recommendationService.getRecommendations(employeeId);
    }
}