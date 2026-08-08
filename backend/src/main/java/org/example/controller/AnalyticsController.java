package org.example.controller;

import org.example.dto.AnalyticsDashboardResponse;
import org.example.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/employee/{employeeId}")
    public AnalyticsDashboardResponse getAnalytics(@PathVariable Long employeeId) {
        return analyticsService.getAnalyticsSummary(employeeId);
    }
}
