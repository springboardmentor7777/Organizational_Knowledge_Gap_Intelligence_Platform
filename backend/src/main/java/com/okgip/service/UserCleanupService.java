package com.okgip.service;

import com.okgip.model.EmployeeSkill;
import com.okgip.model.Enrollment;
import com.okgip.model.Notification;
import com.okgip.model.User;
import com.okgip.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserCleanupService {
    private static final Logger logger = LoggerFactory.getLogger(UserCleanupService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public void deleteUserSafely(User user) {
        if (user == null || user.getId() == null) return;

        logger.info("Purging user account: {} (ID: {})", user.getUsername(), user.getId());

        try {
            refreshTokenRepository.deleteByUser(user);
        } catch (Exception e) {
            logger.warn("Could not delete refresh tokens: {}", e.getMessage());
        }

        try {
            List<EmployeeSkill> skills = employeeSkillRepository.findByUserId(user.getId());
            if (skills != null && !skills.isEmpty()) {
                employeeSkillRepository.deleteAll(skills);
            }
        } catch (Exception e) {
            logger.warn("Could not delete employee skills: {}", e.getMessage());
        }

        try {
            List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
            if (enrollments != null && !enrollments.isEmpty()) {
                enrollmentRepository.deleteAll(enrollments);
            }
        } catch (Exception e) {
            logger.warn("Could not delete enrollments: {}", e.getMessage());
        }

        try {
            List<Notification> notifications = notificationRepository.findByUserId(user.getId());
            if (notifications != null && !notifications.isEmpty()) {
                notificationRepository.deleteAll(notifications);
            }
        } catch (Exception e) {
            logger.warn("Could not delete notifications: {}", e.getMessage());
        }

        userRepository.delete(user);
        logger.info("User account {} successfully deleted.", user.getUsername());
    }

    @Transactional
    public void purgeUserByEmailOrUsername(String email, String username) {
        if (email != null && !email.isBlank()) {
            userRepository.findByEmail(email).ifPresent(this::deleteUserSafely);
        }
        if (username != null && !username.isBlank()) {
            userRepository.findByUsername(username).ifPresent(this::deleteUserSafely);
        }
    }
}
