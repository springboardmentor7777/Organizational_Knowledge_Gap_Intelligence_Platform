package com.example.recommendation;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AIService {
    public record RecommendationDTO(String title, String category, double score, String type) {}

    public List<RecommendationDTO> getLearningPath(List<String> currentSkills) {
        if (!currentSkills.contains("Java")) {
            return List.of(
                new RecommendationDTO("Java Basics", "Programming", 0.90, "COURSE"),
                new RecommendationDTO("Java Certification Prep", "Programming", 0.85, "CERTIFICATION")
            );
        }
        return List.of(
            new RecommendationDTO("Internal AI Workshop", "AI", 0.95, "TRAINING"),
            new RecommendationDTO("Advanced CNN Architectures", "AI", 0.98, "COURSE")
        );
    }
}