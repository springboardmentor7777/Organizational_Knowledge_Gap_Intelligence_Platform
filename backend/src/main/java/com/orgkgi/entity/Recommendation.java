package com.orgkgi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String title;
    private String category;
    private double score;
    private String type;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    public Recommendation() {}

    public Recommendation(Long employeeId, String title, String category, double score, String type) {
        this.employeeId = employeeId;
        this.title = title;
        this.category = category;
        this.score = score;
        this.type = type;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public double getScore() { return score; }
    public String getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}