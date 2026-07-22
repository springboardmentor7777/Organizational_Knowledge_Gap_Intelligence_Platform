package org.example.dto;

public class GapAnalysisResponse {

    private String employeeName;
    private String skillName;
    private int currentLevel;
    private int requiredLevel;
    private int gap;

    // Default Constructor
    public GapAnalysisResponse() {
    }

    // Parameterized Constructor
    public GapAnalysisResponse(String employeeName, String skillName,
                                int currentLevel, int requiredLevel, int gap) {
        this.employeeName = employeeName;
        this.skillName = skillName;
        this.currentLevel = currentLevel;
        this.requiredLevel = requiredLevel;
        this.gap = gap;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(int currentLevel) {
        this.currentLevel = currentLevel;
    }

    public int getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(int requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public int getGap() {
        return gap;
    }

    public void setGap(int gap) {
        this.gap = gap;
    }
}