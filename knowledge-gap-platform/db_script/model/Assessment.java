package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Assessment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @ManyToOne(optional = false) private Skill skill;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AssessmentType type = AssessmentType.QUIZ;

    @Builder.Default
    private Integer timeLimitMinutes = 15;
}
