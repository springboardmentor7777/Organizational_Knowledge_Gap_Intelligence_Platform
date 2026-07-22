package com.orgkgi.service;

import com.orgkgi.dto.SkillGapDTO;
import com.orgkgi.entity.Employee;
import com.orgkgi.entity.EmployeeSkill;
import com.orgkgi.entity.LearningResource;
import com.orgkgi.entity.RequiredSkill;
import com.orgkgi.repository.EmployeeRepository;
import com.orgkgi.repository.EmployeeSkillRepository;
import com.orgkgi.repository.LearningResourceRepository;
import com.orgkgi.repository.RequiredSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final RequiredSkillRepository requiredSkillRepository;
    private final LearningResourceRepository learningResourceRepository;

    @Autowired
    public AIService(EmployeeRepository employeeRepository,
                      EmployeeSkillRepository employeeSkillRepository,
                      RequiredSkillRepository requiredSkillRepository,
                      LearningResourceRepository learningResourceRepository) {
        this.employeeRepository = employeeRepository;
        this.employeeSkillRepository = employeeSkillRepository;
        this.requiredSkillRepository = requiredSkillRepository;
        this.learningResourceRepository = learningResourceRepository;
    }
public com.orgkgi.dto.LearningPathDTO generateLearningPath(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + employeeId));

        List<SkillGapDTO> gaps = analyzeGaps(employeeId);

        List<com.orgkgi.dto.LearningPathStepDTO> steps = new ArrayList<>();
        int stepNumber = 1;
        for (SkillGapDTO gap : gaps) {
            steps.add(new com.orgkgi.dto.LearningPathStepDTO(
                    stepNumber++,
                    gap.getName(),
                    gap.getActualLevel(),
                    gap.getRequiredLevel(),
                    gap.getRecommendedResources()
            ));
        }

        return new com.orgkgi.dto.LearningPathDTO(employeeId, employee.getDesignation(), steps);
    }
    public List<SkillGapDTO> analyzeGaps(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + employeeId));

        String designation = employee.getDesignation();

        List<RequiredSkill> requiredSkills = requiredSkillRepository.findByDesignation(designation);

        List<EmployeeSkill> employeeSkills = employeeSkillRepository.findByEmployeeId(employeeId);

        // map skillId -> employee's actual level, for quick lookup
        Map<Long, Integer> actualLevels = employeeSkills.stream()
                .collect(Collectors.toMap(
                        es -> es.getSkill().getId(),
                        EmployeeSkill::getLevel
                ));

        List<SkillGapDTO> gaps = new ArrayList<>();

        for (RequiredSkill req : requiredSkills) {
            Long skillId = req.getSkill().getId();
            int requiredLevel = req.getRequiredLevel();
            int actualLevel = actualLevels.getOrDefault(skillId, 0);

            if (requiredLevel > actualLevel) {
                int gapSize = requiredLevel - actualLevel;

              List<LearningResource> resources = learningResourceRepository
                        .findBySkillIdAndTargetLevelGreaterThanEqual(skillId, requiredLevel);

                List<com.orgkgi.dto.RecommendedResourceDTO> recommendedResources = resources.stream()
                        .map(r -> new com.orgkgi.dto.RecommendedResourceDTO(r.getTitle(), r.getType()))
                        .collect(Collectors.toList());

                gaps.add(new SkillGapDTO(
                        req.getSkill().getName(),
                        requiredLevel,
                        actualLevel,
                        gapSize,
                        recommendedResources
                ));            }
        }

        // biggest gap first = highest priority
        gaps.sort(Comparator.comparingInt(SkillGapDTO::getGapSize).reversed());

        return gaps;
    }
}