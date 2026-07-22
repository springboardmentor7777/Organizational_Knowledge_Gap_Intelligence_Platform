package com.orgkgi.dto;

import java.util.List;

public class SkillGapDTO {

    private String skillName;
    private int requiredLevel;
    private int actualLevel;
    private int gapSize;
    private List<RecommendedResourceDTO> recommendedResources;

    public SkillGapDTO() {}

    public SkillGapDTO(String skillName, int requiredLevel, int actualLevel, int gapSize, List<RecommendedResourceDTO> recommendedResources) {
        this.skillName = skillName;
        this.requiredLevel = requiredLevel;
        this.actualLevel = actualLevel;
        this.gapSize = gapSize;
        this.recommendedResources = recommendedResources;
    }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public int getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(int requiredLevel) { this.requiredLevel = requiredLevel; }
    public int getActualLevel() { return actualLevel; }
    public void setActualLevel(int actualLevel) { this.actualLevel = actualLevel; }
    public int getGapSize() { return gapSize; }
    public void setGapSize(int gapSize) { this.gapSize = gapSize; }
    public List<RecommendedResourceDTO> getRecommendedResources() { return recommendedResources; }
    public void setRecommendedResources(List<RecommendedResourceDTO> recommendedResources) { this.recommendedResources = recommendedResources; }
}