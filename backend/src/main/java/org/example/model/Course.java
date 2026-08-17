package org.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String provider;

    private String type;
    private String difficulty;
    private int hours;
    private String description;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getProvider() {
        return provider;
    }

    public String getType() {
        return type;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public int getHours() {
        return hours;
    }

    public String getDescription() {
        return description;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
