package com.okgip.controller;

import com.okgip.model.Course;
import com.okgip.model.Source;
import com.okgip.model.EmployeeSkill;
import com.okgip.model.RoleRequirement;
import com.okgip.model.User;
import com.okgip.repository.CourseRepository;
import com.okgip.repository.EmployeeSkillRepository;
import com.okgip.repository.RoleRequirementRepository;
import com.okgip.repository.UserRepository;
import com.okgip.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/learning-paths")
public class LearningPathController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private RoleRequirementRepository roleRequirementRepository;

    @GetMapping("/personalized")
    public ResponseEntity<?> getPersonalizedPath() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        List<EmployeeSkill> userSkills = employeeSkillRepository.findByUserId(user.getId());
        List<RoleRequirement> reqs = roleRequirementRepository.findAll().stream()
                .filter(r -> r.getDepartment().equalsIgnoreCase(user.getDepartment() != null ? user.getDepartment() : ""))
                .toList();

        List<Course> allCourses = courseRepository.findAll();

        List<Map<String, Object>> recommendedPath = new ArrayList<>();

        for (RoleRequirement req : reqs) {
            Optional<EmployeeSkill> esOpt = userSkills.stream()
                    .filter(es -> es.getSkill().getId().equals(req.getSkill().getId()))
                    .findFirst();

            int actualLevel = esOpt.isPresent() && esOpt.get().getProficiencyLevel() != null ? esOpt.get().getProficiencyLevel() : 0;
            int gapSize = req.getRequiredLevel() - actualLevel;

            if (gapSize > 0) {
                // Find matching courses for this target skill
                List<Course> matchingCourses = allCourses.stream()
                        .filter(c -> c.getSkill() != null && c.getSkill().getId().equals(req.getSkill().getId()))
                        .toList();

                for (Course course : matchingCourses) {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("courseId", course.getId());
                    item.put("title", course.getTitle());
                    item.put("description", course.getDescription());
                    item.put("provider", course.getProvider());
                    item.put("url", course.getUrl());
                    item.put("skillId", req.getSkill().getId());
                    item.put("skillName", req.getSkill().getName());
                    item.put("category", req.getSkill().getCategory());
                    item.put("currentLevel", actualLevel);
                    item.put("targetLevel", Math.min(5, actualLevel + 1));
                    item.put("requiredRoleLevel", req.getRequiredLevel());
                    item.put("gapSize", gapSize);
                    item.put("estimatedDurationHours", 12 + (gapSize * 6));
                    recommendedPath.add(item);
                }
            }
        }

        // If no gaps or courses found, provide default top courses
        if (recommendedPath.isEmpty() && !allCourses.isEmpty()) {
            for (Course course : allCourses.stream().limit(3).toList()) {
                Map<String, Object> item = new LinkedHashMap<>();
                item.put("courseId", course.getId());
                item.put("title", course.getTitle());
                item.put("description", course.getDescription());
                item.put("provider", course.getProvider());
                item.put("url", course.getUrl());
                item.put("skillId", course.getSkill() != null ? course.getSkill().getId() : 1L);
                item.put("skillName", course.getSkill() != null ? course.getSkill().getName() : "General Skill");
                item.put("category", course.getSkill() != null ? course.getSkill().getCategory() : "Development");
                item.put("currentLevel", 3);
                item.put("targetLevel", 4);
                item.put("requiredRoleLevel", 4);
                item.put("gapSize", 1);
                item.put("estimatedDurationHours", 15);
                recommendedPath.add(item);
            }
        }

        return ResponseEntity.ok(recommendedPath);
    }

    @PostMapping("/complete-course/{courseId}")
    public ResponseEntity<?> completeCourse(@PathVariable Long courseId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        if (course.getSkill() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Course is not associated with a specific skill"));
        }

        com.okgip.model.Skill skill = course.getSkill();

        // Check if user already has an EmployeeSkill record for this skill
        Optional<EmployeeSkill> esOpt = employeeSkillRepository.findByUserId(user.getId()).stream()
                .filter(es -> es.getSkill().getId().equals(skill.getId()))
                .findFirst();

        int oldLevel = 0;
        int newLevel = 1;

        if (esOpt.isPresent()) {
            EmployeeSkill es = esOpt.get();
            oldLevel = es.getProficiencyLevel() != null ? es.getProficiencyLevel() : 1;
            newLevel = Math.min(5, oldLevel + 1);
            es.setProficiencyLevel(newLevel);
            employeeSkillRepository.save(es);
        } else {
            EmployeeSkill newEs = EmployeeSkill.builder()
                    .user(user)
                    .skill(skill)
                    .proficiencyLevel(1)
                    .source(Source.SELF)
                    .build();
            employeeSkillRepository.save(newEs);
            newLevel = 1;
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Course completed successfully!");
        response.put("skillName", skill.getName());
        response.put("previousLevel", oldLevel);
        response.put("newLevel", newLevel);
        response.put("leveledUp", newLevel > oldLevel);

        return ResponseEntity.ok(response);
    }
}
