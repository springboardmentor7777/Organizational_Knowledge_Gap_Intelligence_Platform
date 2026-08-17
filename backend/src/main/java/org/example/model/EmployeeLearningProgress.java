package org.example.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee_learning_progress")
public class EmployeeLearningProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private int progress;

    private boolean completed;

    private int hoursLearned;

    private Integer score;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    public EmployeeLearningProgress() {
    }

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Course getCourse() {
        return course;
    }

    public int getProgress() {
        return progress;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getHoursLearned() {
        return hoursLearned;
    }

    public Integer getScore() {
        return score;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setHoursLearned(int hoursLearned) {
        this.hoursLearned = hoursLearned;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
