package org.example.service;

import org.example.dto.AnalyticsDashboardResponse;
import org.example.dto.AnalyticsDashboardResponse.Benchmark;
import org.example.dto.AnalyticsDashboardResponse.DepartmentMetric;
import org.example.dto.AnalyticsDashboardResponse.Kpi;
import org.example.dto.AnalyticsDashboardResponse.TeamMember;
import org.example.dto.AnalyticsDashboardResponse.TopMover;
import org.example.dto.AnalyticsDashboardResponse.TrendPoint;
import org.example.model.Employee;
import org.example.model.EmployeeSkill;
import org.example.repository.EmployeeRepository;
import org.example.repository.EmployeeSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    public AnalyticsDashboardResponse getAnalyticsSummary(Long employeeId) {

        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeSkill> employeeSkills =
                employeeSkillRepository.findAll();

        // =========================================================
        // 1. ACTIVE EMPLOYEES
        // =========================================================

        List<Employee> activeEmployees = employees.stream()
                .filter(this::isEmployee)
                .filter(this::isActive)
                .toList();

        int employeeCount = activeEmployees.size();

        // =========================================================
        // 2. SKILL COMPLETION
        // Completed Skills / Assigned Skills * 100
        // =========================================================

        int assignedSkills = employeeSkills.size();
        int completedSkills = 0;

        for (EmployeeSkill employeeSkill : employeeSkills) {

            if (employeeSkill.getProficiencyLevel() >= 3) {
                completedSkills++;
            }
        }

        int skillCompletion = calculatePercentage(
                completedSkills,
                assignedSkills
        );

        // =========================================================
        // 3. TRAINING PROGRESS
        // =========================================================
        //
        // Current model does not contain a separate Course entity.
        // EmployeeSkill status is used only when its value is
        // "completed" or "complete".
        //

        int trainingProgress =
                calculateTrainingProgress(employeeSkills);

        // =========================================================
        // 4. ORGANIZATION KNOWLEDGE GAP
        // Required Level - Current Level
        // =========================================================

        int totalGap = 0;
        int gapCount = 0;

        for (EmployeeSkill employeeSkill : employeeSkills) {

            int currentLevel =
                    employeeSkill.getProficiencyLevel();

            int requiredLevel =
                    parseRequiredLevel(
                            employeeSkill.getSkill().getLevel()
                    );

            if (requiredLevel > 0) {

                totalGap += Math.max(
                        0,
                        requiredLevel - currentLevel
                );

                gapCount++;
            }
        }

        int organizationGapScore = 0;

        if (gapCount > 0) {

            organizationGapScore =
                    (int) Math.round(
                            (double) totalGap / gapCount
                    );
        }

        // 5. KPI
        // =========================================================

        Kpi[] kpis = new Kpi[]{

                new Kpi(
                        "Employee Tracked",
                        String.valueOf(employeeCount),
                        true,
                        employeeCount
                ),

                new Kpi(
                        "Skill Completion",
                        skillCompletion + "%",
                        skillCompletion >= 70,
                        skillCompletion
                ),

                new Kpi(
                        "Training Progress",
                        trainingProgress + "%",
                        trainingProgress >= 70,
                        trainingProgress
                ),

                new Kpi(
                        "ORG Knowledge Gap Score",
                        String.valueOf(organizationGapScore),
                        organizationGapScore <= 2,
                        organizationGapScore
                )
        };

        // =========================================================
        // 6. TEAM MEMBERS
        // =========================================================

        List<TeamMember> teamList = new ArrayList<>();

        for (Employee employee : activeEmployees) {

            List<EmployeeSkill> skills =
                    employeeSkillRepository.findByEmployeeId(
                            employee.getId()
                    );

            int score =
                    calculateEmployeeScore(skills);

            int gap =
                    calculateEmployeeGap(skills);

            teamList.add(
                    new TeamMember(
                            employee.getName(),
                            employee.getRole(),
                            score,
                            gap,
                            0
                    )
            );
        }

        TeamMember[] team =
                teamList.toArray(new TeamMember[0]);

        // =========================================================
        // 7. DEPARTMENT SKILL COMPLETION
        // =========================================================

        Map<String, List<Employee>> departmentEmployees =
                new HashMap<>();

        for (Employee employee : activeEmployees) {

            String department =
                    employee.getDepartment();

            if (department == null ||
                    department.isBlank()) {

                department = "Unknown";
            }

            departmentEmployees
                    .computeIfAbsent(
                            department,
                            key -> new ArrayList<>()
                    )
                    .add(employee);
        }

        List<DepartmentMetric> departmentList =
                new ArrayList<>();

        for (Map.Entry<String, List<Employee>> entry
                : departmentEmployees.entrySet()) {

            String department = entry.getKey();

            List<Employee> departmentEmployeeList =
                    entry.getValue();

            int assigned = 0;
            int completed = 0;
            int departmentGap = 0;

            for (Employee employee :
                    departmentEmployeeList) {

                List<EmployeeSkill> skills =
                        employeeSkillRepository
                                .findByEmployeeId(
                                        employee.getId()
                                );

                assigned += skills.size();

                for (EmployeeSkill employeeSkill :
                        skills) {

                    if (employeeSkill
                            .getProficiencyLevel() >= 3) {

                        completed++;
                    }

                    int currentLevel =
                            employeeSkill
                                    .getProficiencyLevel();

                    int requiredLevel =
                            parseRequiredLevel(
                                    employeeSkill
                                            .getSkill()
                                            .getLevel()
                            );

                    if (requiredLevel > 0) {

                        departmentGap += Math.max(
                                0,
                                requiredLevel - currentLevel
                        );
                    }
                }
            }

            int completion =
                    calculatePercentage(
                            completed,
                            assigned
                    );

            departmentList.add(
                    new DepartmentMetric(
                            department,
                            completion,
                            departmentGap,
                            departmentEmployeeList.size()
                    )
            );
        }

        DepartmentMetric[] departments =
                departmentList.toArray(
                        new DepartmentMetric[0]
                );

        // =========================================================
        // 8. GAP TREND
        // =========================================================
        //
        // Historical quarterly values are not stored in the current
        // database model, so current organization gap is returned.
        //

        TrendPoint[] trend = new TrendPoint[]{
                new TrendPoint(
                        "Current",
                        organizationGapScore
                )
        };

        // =========================================================
        // 9. BENCHMARK
        // =========================================================

        Benchmark[] benchmarks =
                new Benchmark[0];

        // =========================================================
        // 10. TOP MOVERS
        // =========================================================

        TopMover[] topMovers =
                new TopMover[0];

        // =========================================================
        // FINAL RESPONSE
        // =========================================================

        return new AnalyticsDashboardResponse(
                kpis,
                team,
                departments,
                trend,
                benchmarks,
                topMovers
        );
    }

    // =============================================================
    // HELPER METHODS
    // =============================================================

    private boolean isEmployee(Employee employee) {

        String role = employee.getRole();

        if (role == null) {
            return true;
        }

        String normalizedRole =
                role.trim().toLowerCase();

        return !normalizedRole.contains("admin")
                && !normalizedRole.contains("manager")
                && !normalizedRole.equals("hr");
    }

    private boolean isActive(Employee employee) {

        String status = employee.getStatus();

        if (status == null ||
                status.isBlank()) {

            return true;
        }

        return !status.equalsIgnoreCase("inactive")
                && !status.equalsIgnoreCase("terminated");
    }

    private int calculatePercentage(
            int completed,
            int total) {

        if (total <= 0) {
            return 0;
        }

        return (int) Math.round(
                ((double) completed / total) * 100
        );
    }

    private int calculateEmployeeScore(
            List<EmployeeSkill> skills) {

        if (skills == null ||
                skills.isEmpty()) {

            return 0;
        }

        int total = 0;

        for (EmployeeSkill skill : skills) {

            total += skill.getProficiencyLevel();
        }

        double average =
                (double) total / skills.size();

        return (int) Math.round(
                (average / 5.0) * 100
        );
    }

    private int calculateEmployeeGap(
            List<EmployeeSkill> skills) {

        if (skills == null ||
                skills.isEmpty()) {

            return 0;
        }

        int totalGap = 0;

        for (EmployeeSkill employeeSkill :
                skills) {

            int currentLevel =
                    employeeSkill.getProficiencyLevel();

            int requiredLevel =
                    parseRequiredLevel(
                            employeeSkill
                                    .getSkill()
                                    .getLevel()
                    );

            if (requiredLevel > 0) {

                totalGap += Math.max(
                        0,
                        requiredLevel - currentLevel
                );
            }
        }

        return totalGap;
    }

    private int parseRequiredLevel(
            String level) {

        if (level == null ||
                level.isBlank()) {

            return 0;
        }

        String value =
                level.trim().toLowerCase();

        // Numeric level: 1 - 5
        try {

            int numericLevel =
                    Integer.parseInt(value);

            return Math.max(
                    1,
                    Math.min(
                            5,
                            numericLevel
                    )
            );

        } catch (NumberFormatException ignored) {
            // Continue with text level
        }

        // Text level
        if (value.contains("beginner") ||
                value.contains("basic")) {

            return 1;
        }

        if (value.contains("intermediate") ||
                value.contains("medium")) {

            return 3;
        }

        if (value.contains("advanced")) {

            return 4;
        }

        if (value.contains("expert") ||
                value.contains("master")) {

            return 5;
        }

        return 0;
    }

    private int calculateTrainingProgress(
            List<EmployeeSkill> employeeSkills) {

        if (employeeSkills == null ||
                employeeSkills.isEmpty()) {

            return 0;
        }

        int completed = 0;

        for (EmployeeSkill employeeSkill :
                employeeSkills) {

            String status =
                    employeeSkill.getStatus();

            if (status != null &&
                    (status.equalsIgnoreCase("completed")
                            || status.equalsIgnoreCase("complete"))) {

                completed++;
            }
        }

        return calculatePercentage(
                completed,
                employeeSkills.size()
        );
    }
}
