package com.knowledgegap.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee_profile")
public class EmployeeProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String employeeCode;

    private String designation;

    private Integer experience;

    private String education;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private LocalDate joiningDate;

    public EmployeeProfile() {
    }

    // Getters and Setters
}