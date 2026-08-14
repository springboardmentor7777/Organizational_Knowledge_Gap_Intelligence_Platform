package org.example.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.example.dto.NotificationResponse;
import org.example.model.Notification;
import org.example.model.User;
import org.example.repository.NotificationRepository;
import org.example.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                              UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<NotificationResponse> getNotificationsForCurrentUser(String email) {
        User currentUser = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String role = normalizeRole(currentUser.getRole());
        List<Notification> notifications = new ArrayList<>();

        if ("EMPLOYEE".equals(role)) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetUserOrderByCreatedAtDesc(currentUser));
        } else if ("MANAGER".equals(role)) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetManagerIdOrderByCreatedAtDesc(currentUser.getId()));
            notifications.addAll(notificationRepository.findByTargetDepartmentOrderByCreatedAtDesc(currentUser.getDepartment()));
        } else if ("ADMIN".equals(role)) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetDepartmentOrderByCreatedAtDesc("ORG"));
        }

        return notifications.stream()
                .filter(this::isVisibleToUser)
                .distinct()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<NotificationResponse> getNotificationsForEmployee(Long employeeId, String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User targetUser = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!canAccessNotifications(currentUser, targetUser)) {
            throw new AccessDeniedException("You do not have permission to access these notifications");
        }

        return notificationRepository.findByRecipientUserOrderByCreatedAtDesc(targetUser).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public NotificationResponse markAsRead(Long notificationId, String email) {
        User currentUser = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!canAccessNotifications(currentUser, notification)) {
            throw new AccessDeniedException("You do not have permission to update this notification");
        }

        notification.setRead(true);
        return toResponse(notificationRepository.save(notification));
    }

    @Transactional
    public int markAllAsRead(String email) {
        User currentUser = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> notifications = new ArrayList<>();
        if ("EMPLOYEE".equals(normalizeRole(currentUser.getRole()))) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetUserOrderByCreatedAtDesc(currentUser));
        } else if ("MANAGER".equals(normalizeRole(currentUser.getRole()))) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetManagerIdOrderByCreatedAtDesc(currentUser.getId()));
            notifications.addAll(notificationRepository.findByTargetDepartmentOrderByCreatedAtDesc(currentUser.getDepartment()));
        } else if ("ADMIN".equals(normalizeRole(currentUser.getRole()))) {
            notifications.addAll(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(currentUser));
            notifications.addAll(notificationRepository.findByTargetDepartmentOrderByCreatedAtDesc("ORG"));
        }

        int count = 0;
        for (Notification notification : notifications) {
            if (!notification.isRead() && canAccessNotifications(currentUser, notification)) {
                notification.setRead(true);
                notificationRepository.save(notification);
                count++;
            }
        }

        return count;
    }

    private boolean isVisibleToUser(Notification notification) {
        if (notification == null) {
            return false;
        }

        return notification.getScope() != null && !notification.getScope().isBlank();
    }

    private boolean canAccessNotifications(User currentUser, User targetUser) {
        if (currentUser == null || targetUser == null) {
            return false;
        }

        String currentRole = normalizeRole(currentUser.getRole());
        String targetRole = normalizeRole(targetUser.getRole());

        if (currentUser.getId().equals(targetUser.getId())) {
            return true;
        }

        if ("ADMIN".equals(currentRole)) {
            return true;
        }

        if ("MANAGER".equals(currentRole) && ("EMPLOYEE".equals(targetRole) || "MANAGER".equals(targetRole))) {
            return true;
        }

        return false;
    }

    private boolean canAccessNotifications(User currentUser, Notification notification) {
        if (currentUser == null || notification == null) {
            return false;
        }

        if (notification.getRecipientUser() != null && currentUser.getId().equals(notification.getRecipientUser().getId())) {
            return true;
        }

        if (notification.getTargetUser() != null && currentUser.getId().equals(notification.getTargetUser().getId())) {
            return true;
        }

        if ("ADMIN".equals(normalizeRole(currentUser.getRole())) && "ORG".equalsIgnoreCase(notification.getScope())) {
            return true;
        }

        if ("MANAGER".equals(normalizeRole(currentUser.getRole()))
                && ("TEAM".equalsIgnoreCase(notification.getScope()) || "MANAGER".equalsIgnoreCase(notification.getTargetRole()))) {
            return true;
        }

        return false;
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "EMPLOYEE";
        }

        String normalized = role.trim().toUpperCase();
        if (normalized.startsWith("ROLE_")) {
            normalized = normalized.substring(5);
        }

        if (!normalized.equals("EMPLOYEE")
                && !normalized.equals("MANAGER")
                && !normalized.equals("ADMIN")) {
            return "EMPLOYEE";
        }

        return normalized;
    }

    private NotificationResponse toResponse(Notification notification) {
        if (notification == null) {
            return null;
        }

        String group = notification.getGroupLabel() == null ? notification.getScope() : notification.getGroupLabel();
        String timeText = formatTime(notification.getCreatedAt());

        return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                timeText,
                group,
                !notification.isRead()
        );
    }

    private String formatTime(LocalDateTime createdAt) {
        if (createdAt == null) {
            return "Just now";
        }

        Duration duration = Duration.between(createdAt, LocalDateTime.now());
        if (duration.toMinutes() < 1) {
            return "Just now";
        }
        if (duration.toHours() < 1) {
            return duration.toMinutes() + " min ago";
        }
        if (duration.toDays() < 1) {
            return duration.toHours() + " hours ago";
        }
        return duration.toDays() + " days ago";
    }
}
