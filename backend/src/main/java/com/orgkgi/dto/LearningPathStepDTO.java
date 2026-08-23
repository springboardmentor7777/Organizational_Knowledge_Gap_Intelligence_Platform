package com.orgkgi.dto;

import java.util.List;

public class LearningPathStepDTO {

    private int stepNumber;
    private String skillName;
    private int currentLevel;
    private int targetLevel;
    private List<RecommendedResourceDTO> resources;

    public LearningPathStepDTO() {}

    public LearningPathStepDTO(int stepNumber, String skillName, int currentLevel, int targetLevel, List<RecommendedResourceDTO> resources) {
        this.stepNumber = stepNumber;
        this.skillName = skillName;
        this.currentLevel = currentLevel;
        this.targetLevel = targetLevel;
        this.resources = resources;
    }

    public int getStepNumber() { return stepNumber; }
    public void setStepNumber(int stepNumber) { this.stepNumber = stepNumber; }
    public String getName() { return skillName; }
    public void setName(String skillName) { this.skillName = skillName; }
    public int getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(int currentLevel) { this.currentLevel = currentLevel; }
    public int getTargetLevel() { return targetLevel; }
    public void setTargetLevel(int targetLevel) { this.targetLevel = targetLevel; }
    public List<RecommendedResourceDTO> getResources() { return resources; }
    public void setResources(List<RecommendedResourceDTO> resources) { this.resources = resources; }
}