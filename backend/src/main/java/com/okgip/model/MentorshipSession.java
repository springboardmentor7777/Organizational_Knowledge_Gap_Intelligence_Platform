package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorship_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorshipSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private MentorshipMatch match;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SessionStatus status; // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "rating")
    private Integer rating; // 1 to 5 stars rating

    @Column(name = "meeting_url", length = 255)
    private String meetingUrl;

    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = SessionStatus.SCHEDULED;
        }
        if (meetingUrl == null && id != null) {
            meetingUrl = "https://meet.jit.si/okgip-session-" + id;
        }
    }
}
