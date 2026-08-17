package com.okgip.controller;

import com.okgip.model.RoleRequirement;
import com.okgip.model.Skill;
import com.okgip.repository.RoleRequirementRepository;
import com.okgip.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/skills")
@SuppressWarnings("null")
public class SkillController {

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    RoleRequirementRepository roleRequirementRepository;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR_SPECIALIST')")
    public ResponseEntity<?> createSkill(@RequestBody Skill skill) {
        if (skillRepository.findByName(skill.getName()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Skill name already exists!");
        }
        Skill savedSkill = skillRepository.save(skill);
        return ResponseEntity.ok(savedSkill);
    }

    @GetMapping("/requirements")
    public List<RoleRequirement> getRequirements(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String department) {
        if (role != null && department != null) {
            return roleRequirementRepository.findByRoleAndDepartment(role, department);
        }
        return roleRequirementRepository.findAll();
    }

    @PostMapping("/requirements")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR_SPECIALIST')")
    public ResponseEntity<?> saveRequirement(@RequestBody RoleRequirement req) {
        Skill skill = skillRepository.findById(req.getSkill().getId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        
        RoleRequirement requirement = roleRequirementRepository
                .findByRoleAndDepartmentAndSkillId(req.getRole(), req.getDepartment(), skill.getId())
                .orElse(new RoleRequirement());

        requirement.setRole(req.getRole());
        requirement.setDepartment(req.getDepartment());
        requirement.setSkill(skill);
        requirement.setRequiredLevel(req.getRequiredLevel());

        roleRequirementRepository.save(requirement);
        return ResponseEntity.ok("Role requirement updated successfully!");
    }

    @Autowired
    private com.okgip.repository.EmployeeSkillRepository employeeSkillRepository;

    @GetMapping("/experts")
    public ResponseEntity<?> getExperts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department) {
        
        List<com.okgip.model.EmployeeSkill> expertSkills = employeeSkillRepository.findAll().stream()
                .filter(es -> es.getProficiencyLevel() != null && es.getProficiencyLevel() >= 4)
                .toList();

        Map<Long, Map<String, Object>> expertsMap = new java.util.LinkedHashMap<>();

        for (com.okgip.model.EmployeeSkill es : expertSkills) {
            com.okgip.model.User user = es.getUser();
            
            // Filter by department if specified
            if (department != null && !department.isBlank() && !department.equalsIgnoreCase("All")) {
                if (user.getDepartment() == null || !user.getDepartment().equalsIgnoreCase(department)) {
                    continue;
                }
            }

            // Filter by search keyword if specified
            if (search != null && !search.isBlank()) {
                String q = search.toLowerCase();
                boolean matchesName = user.getFullName() != null && user.getFullName().toLowerCase().contains(q);
                boolean matchesUser = user.getUsername().toLowerCase().contains(q);
                boolean matchesSkill = es.getSkill().getName().toLowerCase().contains(q);
                boolean matchesDept = user.getDepartment() != null && user.getDepartment().toLowerCase().contains(q);
                if (!matchesName && !matchesUser && !matchesSkill && !matchesDept) {
                    continue;
                }
            }

            expertsMap.putIfAbsent(user.getId(), new java.util.HashMap<>());
            Map<String, Object> userMap = expertsMap.get(user.getId());

            if (!userMap.containsKey("id")) {
                userMap.put("id", user.getId());
                userMap.put("username", user.getUsername());
                userMap.put("fullName", user.getFullName() != null ? user.getFullName() : user.getUsername());
                userMap.put("title", user.getTitle() != null ? user.getTitle() : "Subject Matter Expert");
                userMap.put("department", user.getDepartment() != null ? user.getDepartment() : "Engineering");
                userMap.put("email", user.getEmail());
                userMap.put("avatarUrl", user.getAvatarUrl());
                userMap.put("isAvailableForMentorship", user.getIsAvailableForMentorship());
                userMap.put("expertSkills", new java.util.ArrayList<Map<String, Object>>());
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> userExpertSkills = (List<Map<String, Object>>) userMap.get("expertSkills");
            
            Map<String, Object> skillMap = new java.util.HashMap<>();
            skillMap.put("skillId", es.getSkill().getId());
            skillMap.put("skillName", es.getSkill().getName());
            skillMap.put("category", es.getSkill().getCategory());
            skillMap.put("level", es.getProficiencyLevel());
            userExpertSkills.add(skillMap);
        }

        return ResponseEntity.ok(new java.util.ArrayList<>(expertsMap.values()));
    }
}
