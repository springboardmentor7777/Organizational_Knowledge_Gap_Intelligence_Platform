package com.knowledgegap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "competency_framework")
public class CompetencyFramework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer competencyId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    private String requiredLevel;

    public CompetencyFramework() {
    }

    // Getters and Setters
}