package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TrainingProgram {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String provider;      // Internal, Coursera, Udemy, LinkedIn Learning
    private String url;

    @ManyToOne(optional = false) private Skill skill;

    @Enumerated(EnumType.STRING)
    private Proficiency targetLevel;

    private Integer durationHours;

    @Column(length = 1000)
    private String description;

    @Builder.Default
    private boolean internal = false;
}
