package org.example;

import java.util.List;
import java.util.Optional;

import org.example.dto.NotificationResponse;
import org.example.model.Notification;
import org.example.model.User;
import org.example.repository.NotificationRepository;
import org.example.repository.UserRepository;
import org.example.service.NotificationService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class NotificationAuthorizationTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private NotificationService notificationService;

    private User employee;
    private User manager;
    private User admin;

    @BeforeEach
    void setUp() {
        employee = new User();
        employee.setId(1L);
        employee.setEmail("employee@company.com");
        employee.setRole("Employee");

        manager = new User();
        manager.setId(2L);
        manager.setEmail("manager@company.com");
        manager.setRole("Manager");
        manager.setDepartment("Engineering");

        admin = new User();
        admin.setId(3L);
        admin.setEmail("admin@company.com");
        admin.setRole("Admin");
    }

    @Test
    void employeeShouldReceiveOwnNotifications() {
        when(userRepository.findByEmail("employee@company.com")).thenReturn(Optional.of(employee));
        when(notificationRepository.findByRecipientUserOrderByCreatedAtDesc(employee))
                .thenReturn(List.of(createNotification("EMPLOYEE", "training", "Training reminder")));

        List<NotificationResponse> result = notificationService.getNotificationsForCurrentUser("employee@company.com");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Training reminder", result.get(0).getTitle());
    }

    @Test
    void managerShouldAccessManagerRelevantNotifications() {
        when(userRepository.findByEmail("manager@company.com")).thenReturn(Optional.of(manager));
        when(notificationRepository.findByTargetManagerIdOrderByCreatedAtDesc(2L))
                .thenReturn(List.of(createNotification("MANAGER", "team", "Team alert")));

        List<NotificationResponse> result = notificationService.getNotificationsForCurrentUser("manager@company.com");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Team alert", result.get(0).getTitle());
    }

    @Test
    void adminShouldAccessOrgNotifications() {
        when(userRepository.findByEmail("admin@company.com")).thenReturn(Optional.of(admin));
        when(notificationRepository.findByTargetDepartmentOrderByCreatedAtDesc("ORG"))
                .thenReturn(List.of(createNotification("ORG", "system", "Organization alert")));

        List<NotificationResponse> result = notificationService.getNotificationsForCurrentUser("admin@company.com");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Organization alert", result.get(0).getTitle());
    }

    private Notification createNotification(String scope, String type, String title) {
        Notification notification = new Notification();
        notification.setId(10L);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage("Example message");
        notification.setScope(scope);
        notification.setTargetRole(type.toUpperCase());
        notification.setRead(false);
        return notification;
    }
}
