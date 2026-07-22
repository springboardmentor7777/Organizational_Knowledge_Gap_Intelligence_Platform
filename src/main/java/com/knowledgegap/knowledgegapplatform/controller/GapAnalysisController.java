package com.knowledgegap.knowledgegapplatform.controller;

import com.knowledgegap.knowledgegapplatform.dto.GapAnalysisRequest;
import com.knowledgegap.knowledgegapplatform.dto.GapAnalysisResponse;
import com.knowledgegap.knowledgegapplatform.entity.GapAnalysis;
import com.knowledgegap.knowledgegapplatform.service.GapAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gap-analysis")
public class GapAnalysisController {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    // Analyze Employee Skill Gap
    @PostMapping("/analyze")
    public GapAnalysisResponse analyzeGap(@RequestBody GapAnalysisRequest request) {
        return gapAnalysisService.analyzeGap(request);
    }

    // Get Gap Analysis by Employee ID
    @GetMapping("/{employeeId}")
    public List<GapAnalysis> getGapAnalysis(@PathVariable Long employeeId) {
        return gapAnalysisService.getGapAnalysisByEmployeeId(employeeId);
    }
}