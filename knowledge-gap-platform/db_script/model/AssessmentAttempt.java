package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AssessmentAttempt {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User user;
    @ManyToOne(optional = false) private Assessment assessment;

    private Integer score;
    private Integer total;
    private Integer percent;

    @Enumerated(EnumType.STRING)
    private Proficiency derivedLevel;

    private LocalDateTime submittedAt;
}
