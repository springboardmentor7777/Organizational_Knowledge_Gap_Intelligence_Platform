package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne private User user;

    private String title;

    @Column(length = 1000)
    private String message;

    private String type; // GAP_ALERT, DEADLINE, RECOMMENDATION, MILESTONE, MENTORSHIP

    @Builder.Default
    private boolean readFlag = false;

    private LocalDateTime createdAt;
}
