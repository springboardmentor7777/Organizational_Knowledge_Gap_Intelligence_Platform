package com.orgkgi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gap_analysis")
public class GapAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    private Integer currentLevel;

    private Integer requiredLevel;

    private Integer gap;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public GapAnalysis() {
    }

    public GapAnalysis(Long id, String skillName, Integer currentLevel,
                       Integer requiredLevel, Integer gap, Employee employee) {
        this.id = id;
        this.skillName = skillName;
        this.currentLevel = currentLevel;
        this.requiredLevel = requiredLevel;
        this.gap = gap;
        this.employee = employee;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return skillName;
    }

    public void setName(String skillName) {
        this.skillName = skillName;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public Integer getGap() {
        return gap;
    }

    public void setGap(Integer gap) {
        this.gap = gap;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}