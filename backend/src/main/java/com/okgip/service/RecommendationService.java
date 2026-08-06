package com.okgip.service;

import com.okgip.dto.GapResponse;
import com.okgip.model.Course;
import com.okgip.model.User;
import com.okgip.repository.CourseRepository;
import com.okgip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@SuppressWarnings("null")
public class RecommendationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    GapAnalysisService gapAnalysisService;

    @Autowired
    OpenAiService openAiService;

    public List<Map<String, Object>> getRecommendedCourses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(userId);
        List<Map<String, Object>> recommendations = new ArrayList<>();

        for (GapResponse gap : gaps) {
            List<Course> matchingCourses = courseRepository.findBySkillId(gap.getSkill().getId());
            for (Course course : matchingCourses) {
                Map<String, Object> rec = new HashMap<>();
                rec.put("course", course);
                rec.put("associatedGap", gap);
                
                // OpenAI / Dynamic AI rationale
                String aiRationale = openAiService.generateRecommendationRationale(
                        user.getFullName(), gap.getSkill().getName(), 
                        gap.getGapScore(), course.getTitle());
                rec.put("aiRationale", aiRationale);
                
                recommendations.add(rec);
            }
        }
        return recommendations;
    }

    public List<Map<String, Object>> generateLearningPath(Long userId) {
        List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(userId);
        List<Map<String, Object>> pathSteps = new ArrayList<>();

        int stepNum = 1;
        // Sort gaps by severity (HIGH -> MEDIUM -> LOW) to prioritize high impact training
        gaps.sort((g1, g2) -> g2.getGapScore().compareTo(g1.getGapScore()));

        for (GapResponse gap : gaps) {
            List<Course> courses = courseRepository.findBySkillId(gap.getSkill().getId());
            if (!courses.isEmpty()) {
                Course selectedCourse = courses.get(0); // Take the first matching course for simplicity
                Map<String, Object> step = new HashMap<>();
                step.put("stepNumber", stepNum++);
                step.put("skillName", gap.getSkill().getName());
                step.put("gapScore", gap.getGapScore());
                step.put("severity", gap.getSeverity());
                step.put("recommendedCourse", selectedCourse);
                step.put("timelineEstimate", gap.getGapScore() * 2 + " Weeks");
                step.put("milestone", "Achieve proficiency level " + gap.getRequiredLevel() + " in " + gap.getSkill().getName());
                pathSteps.add(step);
            }
        }
        return pathSteps;
    }

    private String generateAIRationale(String name, String skill, Integer gapScore, String courseTitle) {
        return String.format(
            "AI Insights for %s: We detected a gap score of %d in '%s'. " +
            "The course '%s' is highly recommended because its curriculum aligns with the target proficiency. " +
            "Completing this course is estimated to reduce this gap by 100%%, elevating your capabilities to meet departmental benchmarks.",
            name, gapScore, skill, courseTitle
        );
    }
}
