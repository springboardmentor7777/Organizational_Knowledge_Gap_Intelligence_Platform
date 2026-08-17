package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "peer_evaluations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeerEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator;

    @ManyToOne(optional = false)
    @JoinColumn(name = "evaluatee_id", nullable = false)
    private User evaluatee;

    @ManyToOne(optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = true)
    private Integer rating; // 1 to 5

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EvaluationStatus status; // PENDING, COMPLETED, EXPIRED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    public enum EvaluationStatus {
        PENDING,
        COMPLETED,
        EXPIRED
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = EvaluationStatus.PENDING;
        }
    }
}
