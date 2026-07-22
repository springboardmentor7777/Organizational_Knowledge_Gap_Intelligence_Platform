package com.knowledgegap.knowledgegapplatform.dto;

public class GapAnalysisResponse {

    private Long employeeId;
    private String skillName;
    private String currentLevel;
    private String requiredLevel;
    private String gapLevel;
    private String status;

    public GapAnalysisResponse() {
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

    public String getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(String currentLevel) {
        this.currentLevel = currentLevel;
    }

    public String getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(String requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public String getGapLevel() {
        return gapLevel;
    }

    public void setGapLevel(String gapLevel) {
        this.gapLevel = gapLevel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}