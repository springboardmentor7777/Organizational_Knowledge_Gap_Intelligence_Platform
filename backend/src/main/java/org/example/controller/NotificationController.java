package org.example.controller;

import java.util.List;

import org.example.dto.NotificationResponse;
import org.example.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getCurrentUserNotifications(Authentication authentication) {
        return ResponseEntity.ok(notificationService.getNotificationsForCurrentUser(authentication.getName()));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    public ResponseEntity<List<NotificationResponse>> getNotifications(@PathVariable Long employeeId,
                                                                     Authentication authentication) {
        return ResponseEntity.ok(notificationService.getNotificationsForEmployee(employeeId, authentication.getName()));
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(@PathVariable Long notificationId,
                                                                      Authentication authentication) {
        return ResponseEntity.ok(notificationService.markAsRead(notificationId, authentication.getName()));
    }

    @PatchMapping("/read-all")
    public ResponseEntity<Integer> markAllNotificationsAsRead(Authentication authentication) {
        return ResponseEntity.ok(notificationService.markAllAsRead(authentication.getName()));
    }
}
