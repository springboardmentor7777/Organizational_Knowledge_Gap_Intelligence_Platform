package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "competency")
public class Competency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "required_level", nullable = false)
    private int requiredLevel;

    public Competency() {
    }

    public Competency(Skill skill, int requiredLevel) {
        this.skill = skill;
        this.requiredLevel = requiredLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public int getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(int requiredLevel) {
        this.requiredLevel = requiredLevel;
    }
}