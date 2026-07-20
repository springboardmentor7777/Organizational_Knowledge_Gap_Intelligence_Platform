package com.example.recommendation;

import java.util.List;

public class RecommendationResponse {
    private String employeeId;
    private List<String> recommendedCourses;

    public RecommendationResponse(String employeeId, List<String> recommendedCourses) {
        this.employeeId = employeeId;
        this.recommendedCourses = recommendedCourses;
    }

    public String getEmployeeId() { return employeeId; }
    public List<String> getRecommendedCourses() { return recommendedCourses; }
}