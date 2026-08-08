package org.example.controller;

import java.util.List;

import org.example.dto.NotificationResponse;
import org.example.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/employee/{employeeId}")
    public List<NotificationResponse> getNotifications(@PathVariable Long employeeId) {
        return notificationService.getNotificationsForEmployee(employeeId);
    }
}
