package com.okgip.controller;

import com.okgip.model.RoleRequirement;
import com.okgip.model.Skill;
import com.okgip.repository.RoleRequirementRepository;
import com.okgip.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
