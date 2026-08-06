package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 50)
    private String provider; // Coursera, Udemy, etc.

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "difficulty_level", nullable = false, length = 20)
    private String difficultyLevel; // Beginner, Intermediate, Advanced

    @Column(length = 255)
    private String url;

    @Builder.Default
    @Column(name = "is_free")
    private Boolean isFree = true;

    @ManyToOne(optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;
}
