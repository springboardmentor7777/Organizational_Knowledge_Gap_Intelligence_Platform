package com.okgip.controller;

import com.okgip.security.UserDetailsImpl;
import com.okgip.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    RecommendationService recommendationService;

    @GetMapping("/courses")
    public ResponseEntity<?> getCourseRecommendations() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Map<String, Object>> recommendations = recommendationService.getRecommendedCourses(userDetails.getId());
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/learning-path")
    public ResponseEntity<?> getLearningPath() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Map<String, Object>> path = recommendationService.generateLearningPath(userDetails.getId());
        return ResponseEntity.ok(path);
    }
}
