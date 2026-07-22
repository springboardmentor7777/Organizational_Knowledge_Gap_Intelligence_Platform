package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "skill_table")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Skill name is required")
    @Column(unique = true, nullable = false)
    private String skillName;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    public Skill() {
    }

    public Skill(Long id, String skillName, String category) {
        this.id = id;
        this.skillName = skillName;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getSkillName() {
        return skillName;
    }

    public String getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}