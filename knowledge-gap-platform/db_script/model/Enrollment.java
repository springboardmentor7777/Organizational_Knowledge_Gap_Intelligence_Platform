package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Enrollment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User user;
    @ManyToOne(optional = false) private TrainingProgram program;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TrainingStatus status = TrainingStatus.NOT_STARTED;

    @Builder.Default
    private Integer progressPercent = 0;

    private LocalDateTime enrolledAt;
    private LocalDateTime completedAt;
    private LocalDateTime dueAt;
}
