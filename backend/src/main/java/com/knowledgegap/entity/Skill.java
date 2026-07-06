package com.knowledgegap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer skillId;

    private String skillName;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Skill() {
    }

    // Getters and Setters
}