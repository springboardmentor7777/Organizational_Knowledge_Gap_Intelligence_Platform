package org.example.service;

import org.example.dto.AnalyticsDashboardResponse;
import org.example.dto.AnalyticsDashboardResponse.Benchmark;
import org.example.dto.AnalyticsDashboardResponse.DepartmentMetric;
import org.example.dto.AnalyticsDashboardResponse.Kpi;
import org.example.dto.AnalyticsDashboardResponse.TeamMember;
import org.example.dto.AnalyticsDashboardResponse.TopMover;
import org.example.dto.AnalyticsDashboardResponse.TrendPoint;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    public AnalyticsDashboardResponse getAnalyticsSummary(Long employeeId) {
        Kpi[] kpis = new Kpi[]{
                new Kpi("Skill Growth", "+18%", true, 3),
                new Kpi("Learning Hours", "96h", true, 7),
                new Kpi("Gap Closed", "12 pts", true, 11),
                new Kpi("Team Percentile", "72nd", true, 5)
        };

        TeamMember[] team = new TeamMember[]{
                new TeamMember("Aisha Kumar", "Sr. Engineer", 82, 18, 6),
                new TeamMember("Tom Reilly", "Engineer", 64, 36, -3),
                new TeamMember("Neha Joshi", "Engineer", 71, 29, 4),
                new TeamMember("Carlos Diaz", "Sr. Engineer", 88, 12, 2),
                new TeamMember("Wei Zhang", "Engineer", 58, 42, -1)
        };

        DepartmentMetric[] departments = new DepartmentMetric[]{
                new DepartmentMetric("Design", 88, 20, 36),
                new DepartmentMetric("Data", 76, 25, 29),
                new DepartmentMetric("Engineering", 82, 32, 214),
                new DepartmentMetric("Product", 71, 28, 48),
                new DepartmentMetric("Support", 65, 38, 62),
                new DepartmentMetric("Sales", 58, 45, 96)
        };

        TrendPoint[] trend = new TrendPoint[]{
                new TrendPoint("Q1'25", 38),
                new TrendPoint("Q2'25", 34),
                new TrendPoint("Q3'26", 30),
                new TrendPoint("Q4'26", 26)
        };

        Benchmark[] benchmarks = new Benchmark[]{
                new Benchmark("Cloud & Security", 58, 64),
                new Benchmark("Leadership", 61, 57),
                new Benchmark("Data Fluency", 66, 60),
                new Benchmark("Compliance", 54, 68)
        };

        TopMover[] topMovers = new TopMover[]{
                new TopMover("Design", "Department", "+14 pts", true),
                new TopMover("Lin Chen", "Mentor impact", "+9 mentee avg", true),
                new TopMover("Sales", "Department", "-3 pts", false),
                new TopMover("Cloud Security curriculum", "Course", "+22% completion", true)
        };

        return new AnalyticsDashboardResponse(kpis, team, departments, trend, benchmarks, topMovers);
    }
}
