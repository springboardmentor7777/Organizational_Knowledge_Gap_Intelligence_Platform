package com.knowledgegap.knowledgegapplatform.service;

import com.knowledgegap.knowledgegapplatform.dto.RecommendationRequest;
import com.knowledgegap.knowledgegapplatform.dto.RecommendationResponse;
import com.knowledgegap.knowledgegapplatform.entity.Recommendation;
import com.knowledgegap.knowledgegapplatform.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    // Generate Recommendation
    public RecommendationResponse generateRecommendation(RecommendationRequest request) {

        Recommendation recommendation = new Recommendation();

        recommendation.setEmployeeId(request.getEmployeeId());
        recommendation.setSkillName(request.getSkillName());

        // Simple recommendation logic
        if (request.getSkillName().equalsIgnoreCase("Java")) {
            recommendation.setRecommendedCourse("Java Programming Masterclass");
            recommendation.setTrainingProvider("Udemy");
        } else if (request.getSkillName().equalsIgnoreCase("Spring Boot")) {
            recommendation.setRecommendedCourse("Spring Boot Complete Guide");
            recommendation.setTrainingProvider("Coursera");
        } else if (request.getSkillName().equalsIgnoreCase("SQL")) {
            recommendation.setRecommendedCourse("Advanced SQL");
            recommendation.setTrainingProvider("Oracle Academy");
        } else {
            recommendation.setRecommendedCourse("General Skill Development");
            recommendation.setTrainingProvider("Internal Training");
        }

        recommendation.setStatus("Recommended");

        recommendationRepository.save(recommendation);

        RecommendationResponse response = new RecommendationResponse();
        response.setEmployeeId(recommendation.getEmployeeId());
        response.setSkillName(recommendation.getSkillName());
        response.setRecommendedCourse(recommendation.getRecommendedCourse());
        response.setTrainingProvider(recommendation.getTrainingProvider());
        response.setStatus(recommendation.getStatus());

        return response;
    }

    // Get Recommendations by Employee ID
    public List<Recommendation> getRecommendationsByEmployeeId(Long employeeId) {
        return recommendationRepository.findByEmployeeId(employeeId);
    }
}