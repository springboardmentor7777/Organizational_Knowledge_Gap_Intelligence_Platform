package com.knowledgegap.knowledgegapplatform.dto;

public class RecommendationRequest {

    private Long employeeId;
    private String skillName;

    public RecommendationRequest() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}