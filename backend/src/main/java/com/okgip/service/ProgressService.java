package com.okgip.service;

import com.okgip.model.*;
import com.okgip.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class ProgressService {

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationService notificationService;

    public List<Course> getCourseCatalog() {
        return courseRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByUserId(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public Enrollment enrollInCourse(Long userId, Long courseId) {
        User user = userRepository.findById(userId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (existing.isPresent()) {
            return existing.get();
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .status(EnrollmentStatus.IN_PROGRESS)
                .enrolledAt(LocalDateTime.now())
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        notificationService.createNotification(
                user,
                String.format("You enrolled in the course '%s'. Let's close your gap!", course.getTitle()),
                NotificationType.RECOMMENDATION
        );

        return saved;
    }

    @Transactional
    public Enrollment updateProgress(Long enrollmentId, String statusStr) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        EnrollmentStatus status = EnrollmentStatus.valueOf(statusStr.toUpperCase());
        enrollment.setStatus(status);

        if (status == EnrollmentStatus.COMPLETED) {
            enrollment.setCompletedAt(LocalDateTime.now());
            
            // Automatic skill level progression on completion!
            incrementUserSkill(enrollment.getUser(), enrollment.getCourse().getSkill());
            notifyStakeholdersOnCompletion(enrollment.getUser(), enrollment.getCourse());
        }

        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public Enrollment verifyAndCompleteCertificate(Long enrollmentId, String certUrl, String certId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setCertificateUrl(certUrl);
        enrollment.setCertificateId(certId != null && !certId.isBlank() ? certId : "CERT-VERIFIED-" + (int)(Math.random() * 900000 + 100000));
        enrollment.setStatus(EnrollmentStatus.COMPLETED);
        enrollment.setCompletedAt(LocalDateTime.now());

        incrementUserSkill(enrollment.getUser(), enrollment.getCourse().getSkill());
        notifyStakeholdersOnCompletion(enrollment.getUser(), enrollment.getCourse());

        return enrollmentRepository.save(enrollment);
    }

    public void notifyStakeholdersOnCompletion(User employee, Course course) {
        // 1. Notify Department Managers
        List<User> managers = userRepository.findByRole(Role.MANAGER).stream()
                .filter(m -> m.getDepartment() != null && m.getDepartment().equalsIgnoreCase(employee.getDepartment()))
                .toList();

        for (User manager : managers) {
            if (!manager.getId().equals(employee.getId())) {
                notificationService.createNotification(
                        manager,
                        String.format("🎓 Team Alert: %s completed '%s' in %s department.",
                                employee.getFullName(), course.getTitle(), employee.getDepartment()),
                        NotificationType.SYSTEM
                );
            }
        }

        // 2. Notify HR Specialists
        List<User> hrSpecialists = userRepository.findByRole(Role.HR_SPECIALIST);
        for (User hr : hrSpecialists) {
            if (!hr.getId().equals(employee.getId())) {
                notificationService.createNotification(
                        hr,
                        String.format("🏆 Talent Upskilling: %s (%s) verified certificate for '%s'.",
                                employee.getFullName(), employee.getDepartment(), course.getTitle()),
                        NotificationType.SYSTEM
                );
            }
        }

        // 3. Notify System Administrators
        List<User> admins = userRepository.findByRole(Role.ADMIN);
        for (User admin : admins) {
            if (!admin.getId().equals(employee.getId())) {
                notificationService.createNotification(
                        admin,
                        String.format("⚙️ Audit Trail: %s completed course '%s'. Skill level upgraded.",
                                employee.getFullName(), course.getTitle()),
                        NotificationType.SYSTEM
                );
            }
        }
    }

    private void incrementUserSkill(User user, Skill skill) {
        if (skill == null) return;
        // Find user's current self rating or default to level 0
        EmployeeSkill empSkill = employeeSkillRepository
                .findByUserIdAndSkillIdAndSource(user.getId(), skill.getId(), Source.SELF)
                .orElse(EmployeeSkill.builder()
                        .user(user)
                        .skill(skill)
                        .proficiencyLevel(0)
                        .source(Source.SELF)
                        .build());

        int oldLevel = empSkill.getProficiencyLevel();
        if (oldLevel < 4) {
            int newLevel = oldLevel + 1;
            empSkill.setProficiencyLevel(newLevel);
            employeeSkillRepository.save(empSkill);

            notificationService.createNotification(
                    user,
                    String.format("🎉 Congratulations! Completing your training increased your '%s' level from %d to %d.", 
                            skill.getName(), oldLevel, newLevel),
                    NotificationType.RECOMMENDATION
            );
        }
    }
}
