package org.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.example.dto.GapAnalysisResponse;
import org.example.model.Assessment;
import org.example.model.Competency;
import org.example.repository.AssessmentRepository;
import org.example.repository.CompetencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GapAnalysisService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private CompetencyRepository competencyRepository;

    public List<GapAnalysisResponse> getGapAnalysis(Long employeeId) {

        List<Assessment> assessments =
                assessmentRepository.findByEmployeeId(employeeId);

        List<GapAnalysisResponse> response = new ArrayList<>();

        for (Assessment assessment : assessments) {

            Optional<Competency> competency =
                    competencyRepository.findBySkillId(
                            assessment.getSkill().getId());

            if (competency.isPresent()) {

                int currentLevel = assessment.getCurrentLevel();
                int requiredLevel = competency.get().getRequiredLevel();
                int gap = requiredLevel - currentLevel;

                String recommendedAction = deriveRecommendedAction(
                        assessment.getSkill().getCategory(),
                        assessment.getSkill().getPriority(),
                        gap,
                        assessment.getStatus()
                );

                GapAnalysisResponse result = new GapAnalysisResponse(
                        assessment.getEmployee().getId(),
                        assessment.getEmployee().getName(),
                        assessment.getSkill().getId(),
                        assessment.getSkill().getSkillName(),
                        assessment.getSkill().getCategory(),
                        assessment.getSkill().getPriority(),
                        assessment.getEmployee().getDepartment(),
                        currentLevel,
                        requiredLevel,
                        gap,
                        assessment.getScore(),
                        assessment.getTotalScore(),
                        assessment.getStatus(),
                        recommendedAction
                );

                response.add(result);
            }
        }

        return response;
    }

    private String deriveRecommendedAction(String category, String priority, int gap, String status) {
        if (gap >= 3) {
            return String.format("Enroll in an intensive %s learning path for %s skills.", category, priority != null ? priority.toLowerCase() : "high-priority");
        }
        if (gap == 2) {
            return String.format("Complete an intermediate %s course to close the gap.", category);
        }
        if (gap == 1) {
            return String.format("Review targeted %s resources and follow up with your coach.", category);
        }
        return status != null && status.equalsIgnoreCase("completed") ? "No action needed; skill is on target." : "Maintain current progress with periodic review.";
    }
}