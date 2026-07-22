package org.example.service;

import org.example.dto.GapAnalysisResponse;
import org.example.model.Assessment;
import org.example.model.Competency;
import org.example.repository.AssessmentRepository;
import org.example.repository.CompetencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

                GapAnalysisResponse result = new GapAnalysisResponse(
                        assessment.getEmployee().getName(),
                        assessment.getSkill().getSkillName(),
                        currentLevel,
                        requiredLevel,
                        gap
                );

                response.add(result);
            }
        }

        return response;
    }
}