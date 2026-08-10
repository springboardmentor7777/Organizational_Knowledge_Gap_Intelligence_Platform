package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RoleCompetency {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobRole;
    private String department;

    @ManyToOne(optional = false) private Skill skill;

    @Enumerated(EnumType.STRING)
    private Proficiency requiredLevel;

    @Builder.Default
    private boolean critical = false;
}
