package com.knowledgegap.controller;
import com.knowledgegap.dto.HeatmapResponse;
import com.knowledgegap.dto.DashboardSummaryResponse;
import com.knowledgegap.dto.SkillAnalysisResponse;
import com.knowledgegap.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.knowledgegap.dto.DepartmentAnalysisResponse;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }
    @GetMapping("/department-analysis")
public List<DepartmentAnalysisResponse> getDepartmentAnalysis() {
    return dashboardService.getDepartmentAnalysis();
}
    @GetMapping("/skill-analysis")
    public List<SkillAnalysisResponse> getSkillAnalysis() {
        return dashboardService.getSkillAnalysis();
    }
    @GetMapping("/heatmap")
public List<HeatmapResponse> getHeatmap() {
    System.out.println("Heatmap API called...");
    return dashboardService.getHeatmap();
}
}