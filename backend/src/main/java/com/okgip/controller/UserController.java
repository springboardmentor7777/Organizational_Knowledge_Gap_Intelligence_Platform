package com.okgip.controller;

import com.okgip.dto.AssessmentRequest;
import com.okgip.dto.ProfileUpdateRequest;
import com.okgip.model.AuditLog;
import com.okgip.model.EmployeeSkill;
import com.okgip.model.Role;
import com.okgip.model.Skill;
import com.okgip.model.Source;
import com.okgip.model.User;
import com.okgip.repository.AuditLogRepository;
import com.okgip.repository.EmployeeSkillRepository;
import com.okgip.repository.SkillRepository;
import com.okgip.repository.UserRepository;
import com.okgip.security.UserDetailsImpl;
import com.okgip.service.UserCleanupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
@SuppressWarnings("null")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserCleanupService userCleanupService;

    @Autowired
    AuditLogRepository auditLogRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<EmployeeSkill> skills = employeeSkillRepository.findByUserId(user.getId());

        Map<String, Object> profileData = new HashMap<>();
        profileData.put("user", user);
        profileData.put("skills", skills);
        profileData.put("isProfileComplete", !skills.isEmpty());

        return ResponseEntity.ok(profileData);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileUpdateRequest req) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if email changed and is already taken by another user
        if (req.getEmail() != null && !req.getEmail().equalsIgnoreCase(user.getEmail())) {
            if (userRepository.existsByEmail(req.getEmail())) {
                return ResponseEntity.badRequest().body("Error: Email is already in use by another account!");
            }
            user.setEmail(req.getEmail());
        }

        if (req.getFullName() != null && !req.getFullName().isBlank()) {
            user.setFullName(req.getFullName());
        }
        if (req.getTitle() != null && !req.getTitle().isBlank()) {
            user.setTitle(req.getTitle());
        }
        if (req.getDepartment() != null && !req.getDepartment().isBlank()) {
            user.setDepartment(req.getDepartment());
        }
        if (req.getPhone() != null) {
            user.setPhone(req.getPhone());
        }
        if (req.getLocation() != null) {
            user.setLocation(req.getLocation());
        }
        if (req.getBio() != null) {
            user.setBio(req.getBio());
        }
        if (req.getLinkedinUrl() != null) {
            user.setLinkedinUrl(req.getLinkedinUrl());
        }
        if (req.getWorkExperience() != null) {
            user.setWorkExperience(req.getWorkExperience());
        }
        if (req.getEducation() != null) {
            user.setEducation(req.getEducation());
        }
        if (req.getCertifications() != null) {
            user.setCertifications(req.getCertifications());
        }
        if (req.getIsAvailableForMentorship() != null) {
            user.setIsAvailableForMentorship(req.getIsAvailableForMentorship());
        }

        if (req.getNewPassword() != null && !req.getNewPassword().isBlank()) {
            user.setPassword(encoder.encode(req.getNewPassword()));
        }

        User updatedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("id", updatedUser.getId());
        response.put("username", updatedUser.getUsername());
        response.put("email", updatedUser.getEmail());
        response.put("role", updatedUser.getRole().name());
        response.put("department", updatedUser.getDepartment());
        response.put("fullName", updatedUser.getFullName());
        response.put("title", updatedUser.getTitle());
        response.put("phone", updatedUser.getPhone());
        response.put("location", updatedUser.getLocation());
        response.put("bio", updatedUser.getBio());
        response.put("linkedinUrl", updatedUser.getLinkedinUrl());
        response.put("workExperience", updatedUser.getWorkExperience());
        response.put("education", updatedUser.getEducation());
        response.put("certifications", updatedUser.getCertifications());
        response.put("isAvailableForMentorship", updatedUser.getIsAvailableForMentorship());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/skills")
    public List<EmployeeSkill> getUserSkills(@PathVariable Long id) {
        return employeeSkillRepository.findByUserId(id);
    }

    @PostMapping("/assess")
    public ResponseEntity<?> submitSelfAssessment(@RequestBody AssessmentRequest req) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        saveRatings(user, req.getRatings(), Source.SELF);
        return ResponseEntity.ok("Self-assessment saved successfully!");
    }

    @PostMapping("/peer-assess")
    public ResponseEntity<?> submitPeerAssessment(@RequestBody AssessmentRequest req) {
        UserDetailsImpl reviewerDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User reviewer = userRepository.findById(reviewerDetails.getId()).orElseThrow();

        User targetUser = userRepository.findById(req.getTargetUserId())
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        Source source = (reviewer.getRole() == Role.MANAGER) ? Source.MANAGER : Source.PEER;

        saveRatings(targetUser, req.getRatings(), source);
        return ResponseEntity.ok("Assessment saved successfully!");
    }

    private void saveRatings(User targetUser, List<AssessmentRequest.SkillRating> ratings, Source source) {
        for (AssessmentRequest.SkillRating rating : ratings) {
            Skill skill = skillRepository.findById(rating.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found with ID: " + rating.getSkillId()));

            EmployeeSkill empSkill = employeeSkillRepository
                    .findByUserIdAndSkillIdAndSource(targetUser.getId(), skill.getId(), source)
                    .orElse(new EmployeeSkill());

            empSkill.setUser(targetUser);
            empSkill.setSkill(skill);
            empSkill.setProficiencyLevel(rating.getLevel());
            empSkill.setSource(source);

            employeeSkillRepository.save(empSkill);
        }
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteMyAccount() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        userCleanupService.deleteUserSafely(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Account successfully deleted.");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        UserDetailsImpl adminDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        String roleStr = body.get("role");
        if (roleStr == null || roleStr.isBlank()) {
            return ResponseEntity.badRequest().body("Role cannot be empty");
        }

        try {
            Role newRole = Role.valueOf(roleStr.toUpperCase());
            Role oldRole = targetUser.getRole();
            targetUser.setRole(newRole);
            userRepository.save(targetUser);

            auditLogRepository.save(AuditLog.builder()
                    .action("USER_ROLE_UPDATED")
                    .performedBy(adminDetails.getUsername())
                    .details("Updated role of " + targetUser.getUsername() + " from " + oldRole + " to " + newRole)
                    .build());

            Map<String, Object> resp = new HashMap<>();
            resp.put("message", "User role updated successfully!");
            resp.put("userId", targetUser.getId());
            resp.put("newRole", newRole.name());
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role specified. Valid options: EMPLOYEE, MANAGER, HR_SPECIALIST, ADMIN");
        }
    }
}
