package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MentorshipMatch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User mentor;
    @ManyToOne(optional = false) private User mentee;
    @ManyToOne(optional = false) private Skill skill;

    private Integer matchScore;
    private String status; // REQUESTED, ACTIVE, COMPLETED
    private LocalDateTime createdAt;
}
