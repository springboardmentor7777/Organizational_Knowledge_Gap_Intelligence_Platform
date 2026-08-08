package org.example.service;

import java.util.ArrayList;
import java.util.List;

import org.example.dto.GapAnalysisResponse;
import org.example.dto.RecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    public List<RecommendationResponse> getRecommendations(Long employeeId) {

        List<GapAnalysisResponse> gapAnalysis =
                gapAnalysisService.getGapAnalysis(employeeId);

        List<RecommendationResponse> recommendations = new ArrayList<>();

        for (GapAnalysisResponse gap : gapAnalysis) {

            String trainingPath = chooseTrainingPath(gap.getSkillCategory(), gap.getGap());
            String provider = chooseProvider(gap.getSkillCategory(), gap.getSkillPriority());
            int estimatedHours = estimateHours(gap.getGap());
            String dueIn = gap.getGap() >= 2 ? "30 days" : "60 days";
            String recommendation = generateRecommendationText(gap.getSkillName(), gap.getGap(), gap.getSkillPriority());

            recommendations.add(
                    new RecommendationResponse(
                            gap.getEmployeeId(),
                            gap.getEmployeeName(),
                            gap.getSkillId(),
                            gap.getSkillName(),
                            gap.getDepartment(),
                            gap.getSkillCategory(),
                            gap.getSkillPriority(),
                            gap.getGap(),
                            recommendation,
                            trainingPath,
                            provider,
                            estimatedHours,
                            dueIn
                    )
            );
        }

        return recommendations;
    }

    private String chooseTrainingPath(String category, int gap) {
        if (gap >= 3) {
            return String.format("Comprehensive %s mastery path", category != null ? category : "Skill");
        }
        if (gap == 2) {
            return String.format("Targeted %s gap-closing course", category != null ? category : "Skill");
        }
        if (gap == 1) {
            return String.format("Quick %s refresh module", category != null ? category : "Skill");
        }
        return "Ongoing skill maintenance";
    }

    private String chooseProvider(String category, String priority) {
        if (priority != null && priority.equalsIgnoreCase("critical")) {
            return "KGI Academy";
        }
        if (category != null && category.equalsIgnoreCase("Security")) {
            return "Secure Learning Hub";
        }
        return "KGI Learning Marketplace";
    }

    private int estimateHours(int gap) {
        if (gap >= 3) {
            return 18;
        }
        if (gap == 2) {
            return 10;
        }
        if (gap == 1) {
            return 5;
        }
        return 2;
    }

    private String generateRecommendationText(String skillName, int gap, String priority) {
        if (gap >= 2) {
            return String.format("Take an intensive %s training path to close this %s gap.", skillName, priority != null ? priority.toLowerCase() : "high-priority");
        }
        if (gap == 1) {
            return String.format("Complete a quick %s refresh to bring this skill on target.", skillName);
        }
        return "Skill is on target; continue current development activities.";
    }
}