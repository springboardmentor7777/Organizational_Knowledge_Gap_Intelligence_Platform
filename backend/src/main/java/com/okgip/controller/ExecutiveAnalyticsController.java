package com.okgip.controller;

import com.okgip.model.EmployeeSkill;
import com.okgip.model.RoleRequirement;
import com.okgip.model.Skill;
import com.okgip.model.User;
import com.okgip.repository.EmployeeSkillRepository;
import com.okgip.repository.RoleRequirementRepository;
import com.okgip.repository.SkillRepository;
import com.okgip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
public class ExecutiveAnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private RoleRequirementRepository roleRequirementRepository;

    @GetMapping("/overview")
    public ResponseEntity<?> getOverview() {
        List<User> allUsers = userRepository.findAll();
        List<Skill> allSkills = skillRepository.findAll();
        List<EmployeeSkill> allEmpSkills = employeeSkillRepository.findAll();
        List<RoleRequirement> allReqs = roleRequirementRepository.findAll();

        long totalEmployees = allUsers.size();
        long totalSkills = allSkills.size();

        double avgCompanyProficiency = allEmpSkills.stream()
                .filter(es -> es.getProficiencyLevel() != null)
                .mapToInt(EmployeeSkill::getProficiencyLevel)
                .average()
                .orElse(0.0);

        // Calculate total identified gaps (required > actual)
        long totalGaps = 0;
        for (User u : allUsers) {
            List<RoleRequirement> reqs = allReqs.stream()
                    .filter(r -> r.getDepartment().equalsIgnoreCase(u.getDepartment() != null ? u.getDepartment() : ""))
                    .toList();
            for (RoleRequirement r : reqs) {
                Optional<EmployeeSkill> esOpt = allEmpSkills.stream()
                        .filter(es -> es.getUser().getId().equals(u.getId()) && es.getSkill().getId().equals(r.getSkill().getId()))
                        .findFirst();
                int actual = esOpt.isPresent() && esOpt.get().getProficiencyLevel() != null ? esOpt.get().getProficiencyLevel() : 0;
                if (actual < r.getRequiredLevel()) {
                    totalGaps++;
                }
            }
        }

        // Single-Point-of-Failure (SPOF): Skills with <= 2 experts (proficiency >= 4)
        Map<Long, Long> skillExpertCount = allEmpSkills.stream()
                .filter(es -> es.getProficiencyLevel() != null && es.getProficiencyLevel() >= 4)
                .collect(Collectors.groupingBy(es -> es.getSkill().getId(), Collectors.counting()));

        long spofCount = allSkills.stream()
                .filter(s -> skillExpertCount.getOrDefault(s.getId(), 0L) <= 2)
                .count();

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalEmployees", totalEmployees);
        stats.put("totalSkills", totalSkills);
        stats.put("avgCompanyProficiency", Math.round(avgCompanyProficiency * 10.0) / 10.0);
        stats.put("totalIdentifiedGaps", totalGaps);
        stats.put("spofVulnerabilityCount", spofCount);
        stats.put("healthIndexScore", Math.min(100, (int)(avgCompanyProficiency * 20)));

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/department-heatmap")
    public ResponseEntity<?> getDepartmentHeatmap() {
        List<User> users = userRepository.findAll();
        List<Skill> skills = skillRepository.findAll();
        List<EmployeeSkill> empSkills = employeeSkillRepository.findAll();

        // Get unique departments
        Set<String> departments = users.stream()
                .map(User::getDepartment)
                .filter(d -> d != null && !d.isBlank())
                .collect(Collectors.toCollection(TreeSet::new));

        if (departments.isEmpty()) {
            departments.add("Engineering");
            departments.add("Product Management");
            departments.add("Data & AI");
        }

        List<Map<String, Object>> heatmapMatrix = new ArrayList<>();

        for (String dept : departments) {
            List<User> deptUsers = users.stream()
                    .filter(u -> u.getDepartment() != null && u.getDepartment().equalsIgnoreCase(dept))
                    .toList();

            Map<String, Object> deptRow = new LinkedHashMap<>();
            deptRow.put("department", dept);
            deptRow.put("employeeCount", deptUsers.size());

            List<Map<String, Object>> skillScores = new ArrayList<>();

            for (Skill skill : skills) {
                List<EmployeeSkill> matchingSkills = empSkills.stream()
                        .filter(es -> es.getUser().getDepartment() != null && es.getUser().getDepartment().equalsIgnoreCase(dept))
                        .filter(es -> es.getSkill().getId().equals(skill.getId()))
                        .toList();

                double avgProficiency = matchingSkills.stream()
                        .filter(es -> es.getProficiencyLevel() != null)
                        .mapToInt(EmployeeSkill::getProficiencyLevel)
                        .average()
                        .orElse(0.0);

                Map<String, Object> skillData = new HashMap<>();
                skillData.put("skillId", skill.getId());
                skillData.put("skillName", skill.getName());
                skillData.put("category", skill.getCategory());
                skillData.put("avgProficiency", Math.round(avgProficiency * 10.0) / 10.0);
                skillData.put("evaluatedEmployees", matchingSkills.size());

                // Status tag: HEALTHY (>= 3.8), MODERATE (2.5 - 3.7), CRITICAL (< 2.5)
                String status = avgProficiency >= 3.8 ? "HEALTHY" : (avgProficiency >= 2.5 ? "MODERATE" : "CRITICAL");
                skillData.put("status", status);

                skillScores.add(skillData);
            }

            deptRow.put("skillScores", skillScores);
            heatmapMatrix.add(deptRow);
        }

        return ResponseEntity.ok(heatmapMatrix);
    }

    @GetMapping("/spof-risks")
    public ResponseEntity<?> getSpofRisks() {
        List<Skill> skills = skillRepository.findAll();
        List<EmployeeSkill> empSkills = employeeSkillRepository.findAll();

        List<Map<String, Object>> spofRisks = new ArrayList<>();

        for (Skill skill : skills) {
            List<EmployeeSkill> experts = empSkills.stream()
                    .filter(es -> es.getSkill().getId().equals(skill.getId()))
                    .filter(es -> es.getProficiencyLevel() != null && es.getProficiencyLevel() >= 4)
                    .toList();

            if (experts.size() <= 2) {
                Map<String, Object> risk = new LinkedHashMap<>();
                risk.put("skillId", skill.getId());
                risk.put("skillName", skill.getName());
                risk.put("category", skill.getCategory());
                risk.put("expertCount", experts.size());
                risk.put("riskLevel", experts.isEmpty() ? "HIGH_VULNERABILITY" : "MEDIUM_VULNERABILITY");

                List<Map<String, String>> soleExperts = experts.stream()
                        .map(es -> Map.of(
                                "id", es.getUser().getId().toString(),
                                "name", es.getUser().getFullName() != null ? es.getUser().getFullName() : es.getUser().getUsername(),
                                "title", es.getUser().getTitle() != null ? es.getUser().getTitle() : "Team Member",
                                "department", es.getUser().getDepartment() != null ? es.getUser().getDepartment() : "General"
                        ))
                        .toList();

                risk.put("soleExperts", soleExperts);

                // Recommend cross-training candidates (level 2 or 3)
                List<Map<String, String>> crossTrainCandidates = empSkills.stream()
                        .filter(es -> es.getSkill().getId().equals(skill.getId()))
                        .filter(es -> es.getProficiencyLevel() != null && es.getProficiencyLevel() >= 2 && es.getProficiencyLevel() <= 3)
                        .limit(3)
                        .map(es -> Map.of(
                                "id", es.getUser().getId().toString(),
                                "name", es.getUser().getFullName() != null ? es.getUser().getFullName() : es.getUser().getUsername(),
                                "currentLevel", es.getProficiencyLevel().toString()
                        ))
                        .toList();

                risk.put("crossTrainCandidates", crossTrainCandidates);

                spofRisks.add(risk);
            }
        }

        return ResponseEntity.ok(spofRisks);
    }

    @GetMapping("/export-csv")
    public ResponseEntity<byte[]> exportCsv() {
        List<Skill> skills = skillRepository.findAll();
        List<EmployeeSkill> empSkills = employeeSkillRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("Skill ID,Skill Name,Category,Total Employees Assessed,Avg Proficiency,Expert Count (L4/L5),SPOF Risk Status\n");

        for (Skill s : skills) {
            List<EmployeeSkill> matching = empSkills.stream()
                    .filter(es -> es.getSkill().getId().equals(s.getId()))
                    .toList();

            double avg = matching.stream()
                    .filter(es -> es.getProficiencyLevel() != null)
                    .mapToInt(EmployeeSkill::getProficiencyLevel)
                    .average()
                    .orElse(0.0);

            long expertCount = matching.stream()
                    .filter(es -> es.getProficiencyLevel() != null && es.getProficiencyLevel() >= 4)
                    .count();

            String status = expertCount <= 2 ? "HIGH RISK (SPOF)" : "STABLE";

            csv.append(String.format("%d,\"%s\",\"%s\",%d,%.1f,%d,%s\n",
                    s.getId(),
                    s.getName().replace("\"", "\"\""),
                    s.getCategory().replace("\"", "\"\""),
                    matching.size(),
                    avg,
                    expertCount,
                    status
            ));
        }

        byte[] body = csv.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=executive_skill_gap_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(body);
    }
}
