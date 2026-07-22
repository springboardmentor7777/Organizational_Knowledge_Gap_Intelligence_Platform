package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "employee_skillsTable")
public class EmployeeSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Employee is required")
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @NotNull(message = "Skill is required")
    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Min(value = 1, message = "Proficiency level must be between 1 and 5")
    @Max(value = 5, message = "Proficiency level must be between 1 and 5")
    private int proficiencyLevel;

    @Min(value = 0, message = "Experience cannot be negative")
    private int experienceYears;

    public EmployeeSkill() {
    }

    public EmployeeSkill(Long id, Employee employee, Skill skill,
                         int proficiencyLevel, int experienceYears) {
        this.id = id;
        this.employee = employee;
        this.skill = skill;
        this.proficiencyLevel = proficiencyLevel;
        this.experienceYears = experienceYears;
    }

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Skill getSkill() {
        return skill;
    }

    public int getProficiencyLevel() {
        return proficiencyLevel;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public void setProficiencyLevel(int proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }
}