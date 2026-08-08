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
@Table(name = "assessment")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "current_level", nullable = false)
    private int currentLevel;

    private int score;
    private int totalScore;
    private int gap;
    private String status;
    private String reviewer;
    private java.time.LocalDateTime submittedOn;

    public Assessment() {
    }

    public Assessment(Employee employee, Skill skill, int currentLevel, int score,
                      int totalScore, int gap, String status,
                      String reviewer, java.time.LocalDateTime submittedOn) {
        this.employee = employee;
        this.skill = skill;
        this.currentLevel = currentLevel;
        this.score = score;
        this.totalScore = totalScore;
        this.gap = gap;
        this.status = status;
        this.reviewer = reviewer;
        this.submittedOn = submittedOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public int getCurrentLevel() {
        return currentLevel;
    }

    public int getScore() {
        return score;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public int getGap() {
        return gap;
    }

    public String getStatus() {
        return status;
    }

    public String getReviewer() {
        return reviewer;
    }

    public java.time.LocalDateTime getSubmittedOn() {
        return submittedOn;
    }

    public void setCurrentLevel(int currentLevel) {
        this.currentLevel = currentLevel;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public void setGap(int gap) {
        this.gap = gap;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public void setSubmittedOn(java.time.LocalDateTime submittedOn) {
        this.submittedOn = submittedOn;
    }
}