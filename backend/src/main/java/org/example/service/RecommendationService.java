package org.example.service;

import org.example.dto.GapAnalysisResponse;
import org.example.dto.RecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    public List<RecommendationResponse> getRecommendations(Long employeeId) {

        List<GapAnalysisResponse> gapAnalysis =
                gapAnalysisService.getGapAnalysis(employeeId);

        List<RecommendationResponse> recommendations = new ArrayList<>();

        for (GapAnalysisResponse gap : gapAnalysis) {

            String recommendation;

            if (gap.getGap() >= 2) {
                recommendation = "Advanced " + gap.getSkillName() + " Training";
            } else if (gap.getGap() == 1) {
                recommendation = "Beginner " + gap.getSkillName() + " Training";
            } else {
                recommendation = "No Training Required";
            }

            recommendations.add(
                    new RecommendationResponse(
                            gap.getEmployeeName(),
                            gap.getSkillName(),
                            gap.getGap(),
                            recommendation
                    )
            );
        }

        return recommendations;
    }
}