package com.okgip.service;

import com.okgip.dto.GapResponse;
import com.okgip.model.*;
import com.okgip.repository.EmployeeSkillRepository;
import com.okgip.repository.RoleRequirementRepository;
import com.okgip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class GapAnalysisService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRequirementRepository roleRequirementRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Transactional(readOnly = true)
    public List<GapResponse> calculateUserGaps(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get required skills for user's role and department
        List<RoleRequirement> requirements = roleRequirementRepository.findByRoleAndDepartment(
                user.getRole().name(), user.getDepartment());

        if (requirements.isEmpty()) {
            // Fallback to role benchmarks in default department or any matching role
            requirements = roleRequirementRepository.findByRoleAndDepartment(user.getRole().name(), "Engineering");
            if (requirements.isEmpty()) {
                requirements = roleRequirementRepository.findAll().stream()
                        .filter(r -> r.getRole().equals(user.getRole().name()))
                        .collect(Collectors.toList());
            }
        }

        // Get all ratings for this user
        List<EmployeeSkill> userSkills = employeeSkillRepository.findByUserId(userId);

        // If user has not completed skill assessment/profile yet, return 0 gaps
        if (userSkills.isEmpty()) {
            return Collections.emptyList();
        }

        // Resolve current levels using MANAGER > PEER > SELF precedence
        Map<Long, Integer> resolvedSkills = resolveProficiencyLevels(userSkills);

        List<GapResponse> gaps = new ArrayList<>();
        for (RoleRequirement req : requirements) {
            Skill skill = req.getSkill();
            Integer required = req.getRequiredLevel();
            Integer current = resolvedSkills.getOrDefault(skill.getId(), 0);

            if (required > current) {
                int score = required - current;
                String severity = "LOW";
                if (score == 2) {
                    severity = "MEDIUM";
                } else if (score >= 3) {
                    severity = "HIGH";
                }

                gaps.add(GapResponse.builder()
                        .skill(skill)
                        .requiredLevel(required)
                        .currentLevel(current)
                        .gapScore(score)
                        .severity(severity)
                        .build());
            }
        }
        return gaps;
    }

    public Map<Long, Integer> resolveProficiencyLevels(List<EmployeeSkill> skills) {
        // Group by skill ID
        Map<Long, List<EmployeeSkill>> grouped = skills.stream()
                .collect(Collectors.groupingBy(s -> s.getSkill().getId()));

        Map<Long, Integer> resolved = new HashMap<>();
        for (Map.Entry<Long, List<EmployeeSkill>> entry : grouped.entrySet()) {
            List<EmployeeSkill> list = entry.getValue();
            // Precedence: MANAGER -> PEER -> SELF
            Optional<EmployeeSkill> managerRating = list.stream().filter(s -> s.getSource() == Source.MANAGER).findFirst();
            if (managerRating.isPresent()) {
                resolved.put(entry.getKey(), managerRating.get().getProficiencyLevel());
                continue;
            }

            Optional<EmployeeSkill> peerRating = list.stream().filter(s -> s.getSource() == Source.PEER).findFirst();
            if (peerRating.isPresent()) {
                resolved.put(entry.getKey(), peerRating.get().getProficiencyLevel());
                continue;
            }

            Optional<EmployeeSkill> selfRating = list.stream().filter(s -> s.getSource() == Source.SELF).findFirst();
            selfRating.ifPresent(employeeSkill -> resolved.put(entry.getKey(), employeeSkill.getProficiencyLevel()));
        }
        return resolved;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> calculateDepartmentHeatmap(String department) {
        List<User> deptUsers = userRepository.findAllByDepartment(department);
        // Find all unique skills required in this department
        Set<Skill> deptSkills = new HashSet<>();
        for (User user : deptUsers) {
            List<RoleRequirement> requirements = roleRequirementRepository.findByRoleAndDepartment(
                    user.getRole().name(), user.getDepartment());
            for (RoleRequirement req : requirements) {
                deptSkills.add(req.getSkill());
            }
        }

        List<Map<String, Object>> heatmapNodes = new ArrayList<>();

        for (User user : deptUsers) {
            List<EmployeeSkill> userSkills = employeeSkillRepository.findByUserId(user.getId());
            Map<Long, Integer> resolved = resolveProficiencyLevels(userSkills);

            Map<String, Object> node = new HashMap<>();
            node.put("userId", user.getId());
            node.put("username", user.getUsername());
            node.put("fullName", user.getFullName());
            node.put("role", user.getRole().name());

            Map<String, Integer> skillLevels = new HashMap<>();
            for (Skill skill : deptSkills) {
                skillLevels.put(skill.getName(), resolved.getOrDefault(skill.getId(), 0));
            }
            node.put("skills", skillLevels);
            heatmapNodes.add(node);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("department", department);
        result.put("skillsList", deptSkills.stream().map(Skill::getName).collect(Collectors.toList()));
        result.put("matrix", heatmapNodes);
        return result;
    }
}
