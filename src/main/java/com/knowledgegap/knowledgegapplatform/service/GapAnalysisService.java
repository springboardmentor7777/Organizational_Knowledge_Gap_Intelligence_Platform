package com.knowledgegap.knowledgegapplatform.service;

import com.knowledgegap.knowledgegapplatform.dto.GapAnalysisRequest;
import com.knowledgegap.knowledgegapplatform.dto.GapAnalysisResponse;
import com.knowledgegap.knowledgegapplatform.entity.GapAnalysis;
import com.knowledgegap.knowledgegapplatform.repository.GapAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GapAnalysisService {

    @Autowired
    private GapAnalysisRepository gapAnalysisRepository;

    // Analyze employee skill gap
    public GapAnalysisResponse analyzeGap(GapAnalysisRequest request) {

        GapAnalysis gap = new GapAnalysis();

        gap.setEmployeeId(request.getEmployeeId());
        gap.setSkillName(request.getSkillName());
        gap.setCurrentLevel(request.getCurrentLevel());
        gap.setRequiredLevel(request.getRequiredLevel());

        // Simple Gap Logic
        if (request.getCurrentLevel().equalsIgnoreCase(request.getRequiredLevel())) {
            gap.setGapLevel("No Gap");
            gap.setStatus("Completed");
        } else {
            gap.setGapLevel("Gap Found");
            gap.setStatus("Training Required");
        }

        gapAnalysisRepository.save(gap);

        GapAnalysisResponse response = new GapAnalysisResponse();
        response.setEmployeeId(gap.getEmployeeId());
        response.setSkillName(gap.getSkillName());
        response.setCurrentLevel(gap.getCurrentLevel());
        response.setRequiredLevel(gap.getRequiredLevel());
        response.setGapLevel(gap.getGapLevel());
        response.setStatus(gap.getStatus());

        return response;
    }

    // Get Gap Analysis by Employee ID
    public List<GapAnalysis> getGapAnalysisByEmployeeId(Long employeeId) {
        return gapAnalysisRepository.findByEmployeeId(employeeId);
    }
}