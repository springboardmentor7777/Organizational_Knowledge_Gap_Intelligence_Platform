package com.orgkgi.recommendation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.orgkgi.entity.Recommendation;
import com.orgkgi.repository.RecommendationRepository;
import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final AIService aiService;

    public RecommendationService(RecommendationRepository recommendationRepository, AIService aiService) {
        this.recommendationRepository = recommendationRepository;
        this.aiService = aiService;
    }

    public List<Recommendation> getRecommendationsByEmployeeId(Long employeeId) {
        return recommendationRepository.findByEmployeeIdOrderByScoreDesc(employeeId);
    }

    public List<Recommendation> getRecommendationHistory(Long employeeId) {
        return recommendationRepository.findByEmployeeIdOrderByCreatedAtDesc(employeeId);
    }

    @Transactional
    public void generateRecommendationsForEmployee(Long employeeId) {
        List<String> currentSkills = List.of("Java"); 
        
        // This now works because of the explicit import above
        List<AIService.RecommendationDTO> path = aiService.getLearningPath(currentSkills);
        
        for (AIService.RecommendationDTO dto : path) {
            Recommendation rec = new Recommendation(
                employeeId, 
                dto.title(), 
                dto.category(), 
                dto.score(), 
                dto.type()
            );
            recommendationRepository.save(rec);
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
