package com.orgkgi.recommendation;

import com.orgkgi.dto.SkillGapDTO;
import com.orgkgi.entity.Recommendation;
import com.orgkgi.repository.RecommendationRepository;
import com.orgkgi.service.AIService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final AIService aiService;

    public RecommendationService(RecommendationRepository recommendationRepository, AIService aiService) {
        this.recommendationRepository = recommendationRepository;
        this.aiService = aiService;
    }

    public List<Recommendation> getRecommendationsByEmployeeId(Long employeeId) {
        Optional<Recommendation> latest = recommendationRepository.findTopByEmployeeIdOrderByCreatedAtDesc(employeeId);

        if (latest.isEmpty()) {
            return List.of();
        }

        return recommendationRepository.findByEmployeeIdAndCreatedAtOrderByScoreDesc(
                employeeId, latest.get().getCreatedAt());
    }

    public List<Recommendation> getRecommendationHistory(Long employeeId) {
        return recommendationRepository.findByEmployeeIdOrderByCreatedAtDesc(employeeId);
    }

    @Transactional
    public void generateRecommendationsForEmployee(Long employeeId) {
        List<SkillGapDTO> gaps = aiService.analyzeGaps(employeeId);
        LocalDateTime batchTime = LocalDateTime.now();

        for (SkillGapDTO gap : gaps) {
            double score = Math.min(1.0, gap.getGapSize() / 4.0);

            for (com.orgkgi.dto.RecommendedResourceDTO resource : gap.getRecommendedResources()) {
                Recommendation rec = new Recommendation(
                        employeeId,
                        resource.getTitle(),
                        gap.getSkillName(),
                        score,
                        resource.getType()
                );
                rec.setCreatedAt(batchTime);
                recommendationRepository.save(rec);
            }
        }
    }

    @Transactional
    public void refreshRecommendations(Long employeeId) {
        List<Recommendation> oldRecs = recommendationRepository.findByEmployeeId(employeeId);
        if (oldRecs != null && !oldRecs.isEmpty()) {
            recommendationRepository.deleteAll(oldRecs);
        }
        generateRecommendationsForEmployee(employeeId);
    }
}