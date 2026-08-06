package com.okgip.controller;

import com.okgip.dto.GapResponse;
import com.okgip.model.*;
import com.okgip.repository.*;
import com.okgip.security.UserDetailsImpl;
import com.okgip.service.GapAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
@SuppressWarnings("null")
public class DashboardController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    MentorshipMatchRepository mentorshipMatchRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Autowired
    GapAnalysisService gapAnalysisService;

    @GetMapping("/stats")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getDashboardStats() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        Map<String, Object> stats = new HashMap<>();
        stats.put("role", user.getRole().name());
        stats.put("department", user.getDepartment());

        if (user.getRole() == Role.EMPLOYEE) {
            // Employee metrics
            List<EmployeeSkill> userSkills = employeeSkillRepository.findByUserId(user.getId());
            boolean isProfileComplete = !userSkills.isEmpty();

            List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(user.getId());
            List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
            long inProgressCount = enrollments.stream().filter(e -> e.getStatus() == EnrollmentStatus.IN_PROGRESS).count();
            long completedCount = enrollments.stream().filter(e -> e.getStatus() == EnrollmentStatus.COMPLETED).count();

            stats.put("isProfileComplete", isProfileComplete);
            stats.put("assessedSkillsCount", userSkills.size());
            stats.put("gapCount", gaps.size());
            stats.put("activeGaps", gaps);
            stats.put("coursesInProgress", inProgressCount);
            stats.put("coursesCompleted", completedCount);
            
            // Mentorships
            long activeMentorships = mentorshipMatchRepository.findByMenteeIdAndStatus(user.getId(), MatchStatus.ACTIVE).size() +
                    mentorshipMatchRepository.findByMentorIdAndStatus(user.getId(), MatchStatus.ACTIVE).size();
            stats.put("activeMentorships", activeMentorships);

        } else if (user.getRole() == Role.MANAGER) {
            // Manager metrics for their department
            List<User> deptUsers = userRepository.findAllByDepartment(user.getDepartment());
            int employeeCount = deptUsers.size();

            // Total gaps in department
            int totalGaps = 0;
            int highRiskGaps = 0;
            for (User u : deptUsers) {
                List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(u.getId());
                totalGaps += gaps.size();
                highRiskGaps += (int) gaps.stream().filter(g -> "HIGH".equals(g.getSeverity())).count();
            }

            stats.put("teamSize", employeeCount);
            stats.put("totalTeamGaps", totalGaps);
            stats.put("highRiskTeamGaps", highRiskGaps);

            // Active mentorships in dept
            long activeMentorships = mentorshipMatchRepository.findAll().stream()
                    .filter(m -> m.getStatus() == MatchStatus.ACTIVE && 
                            (m.getMentor().getDepartment().equals(user.getDepartment()) || 
                             m.getMentee().getDepartment().equals(user.getDepartment())))
                    .count();
            stats.put("activeTeamMentorships", activeMentorships);

        } else {
            // HR / Admin metrics (Org-wide)
            stats.put("totalUsers", userRepository.count());
            stats.put("totalSkills", skillRepository.count());
            
            long totalGaps = 0;
            List<User> allUsers = userRepository.findAll();
            for (User u : allUsers) {
                totalGaps += gapAnalysisService.calculateUserGaps(u.getId()).size();
            }
            stats.put("totalGaps", totalGaps);
            stats.put("activeMentorships", mentorshipMatchRepository.findByStatus(MatchStatus.ACTIVE).size());
            
            // System logs snippet
            List<AuditLog> recentLogs = auditLogRepository.findAllByOrderByTimestampDesc().stream()
                    .limit(10)
                    .collect(Collectors.toList());
            stats.put("recentLogs", recentLogs);
        }

        return ResponseEntity.ok(stats);
    }
}
