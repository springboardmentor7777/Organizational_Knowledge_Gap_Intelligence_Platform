package com.orgkgi.controller;

import com.orgkgi.entity.GapAnalysis;
import com.orgkgi.service.GapAnalysisService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gap-analysis")
public class GapAnalysisController {

    private final GapAnalysisService gapAnalysisService;

    public GapAnalysisController(GapAnalysisService gapAnalysisService) {
        this.gapAnalysisService = gapAnalysisService;
    }

    // Generate Gap Analysis
    @PostMapping("/{employeeId}")
    public List<GapAnalysis> generateGapAnalysis(@PathVariable Long employeeId) {
        return gapAnalysisService.generateGapAnalysis(employeeId);
    }

    // Get Existing Gap Analysis
    @GetMapping("/{employeeId}")
    public List<GapAnalysis> getGapAnalysis(@PathVariable Long employeeId) {
        return gapAnalysisService.getEmployeeGapAnalysis(employeeId);
    }
}