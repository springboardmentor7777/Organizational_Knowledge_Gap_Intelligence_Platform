package com.orgkgi.dto;

import java.util.List;

public class LearningPathDTO {

    private Long employeeId;
    private String designation;
    private List<LearningPathStepDTO> steps;

    public LearningPathDTO() {}

    public LearningPathDTO(Long employeeId, String designation, List<LearningPathStepDTO> steps) {
        this.employeeId = employeeId;
        this.designation = designation;
        this.steps = steps;
    }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public List<LearningPathStepDTO> getSteps() { return steps; }
    public void setSteps(List<LearningPathStepDTO> steps) { this.steps = steps; }
}
