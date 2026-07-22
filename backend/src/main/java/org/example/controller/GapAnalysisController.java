package org.example.controller;

import org.example.dto.GapAnalysisResponse;
import org.example.service.GapAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gap-analysis")
@CrossOrigin(origins = "*")
public class GapAnalysisController {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    @GetMapping("/employee/{employeeId}")
    public List<GapAnalysisResponse> getGapAnalysis(
            @PathVariable Long employeeId) {

        return gapAnalysisService.getGapAnalysis(employeeId);
    }
}