package org.example.service;

import java.util.ArrayList;
import java.util.List;

import org.example.dto.NotificationResponse;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public List<NotificationResponse> getNotificationsForEmployee(Long employeeId) {
        List<NotificationResponse> notifications = new ArrayList<>();

        notifications.add(new NotificationResponse(1L, "training", "Applied Cloud Security starts in 2 hours",
                "Don't forget your scheduled session at 3:00 PM today.", "10 min ago", "Today", true));
        notifications.add(new NotificationResponse(2L, "skill", "New Critical gap flagged: Compliance",
                "Finance department Compliance score dropped below threshold.", "1 hour ago", "Today", true));
        notifications.add(new NotificationResponse(3L, "mention", "Rohan Verma mentioned you",
                "“Can Aisha take a look at the design system gap?”", "3 hours ago", "Today", true));
        notifications.add(new NotificationResponse(4L, "training", "Reminder: Self-assessment due Friday",
                "Your Q3 self-assessment hasn't been submitted yet.", "Yesterday, 4:12 PM", "Yesterday", false));
        notifications.add(new NotificationResponse(5L, "system", "Competency Framework updated to v2.3",
                "HR published updated role requirements for Engineering.", "Yesterday, 11:00 AM", "Yesterday", false));
        notifications.add(new NotificationResponse(6L, "skill", "Your Cloud Security score improved",
                "Up 9 points since last assessment — nice progress.", "2 days ago", "This Week", false));
        notifications.add(new NotificationResponse(7L, "training", "New course match: Advanced Threat Modeling",
                "96% AI match based on your current skill gaps.", "3 days ago", "This Week", false));

        return notifications;
    }
}
