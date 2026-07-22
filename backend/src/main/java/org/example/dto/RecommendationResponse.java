package org.example.dto;

public class RecommendationResponse {

    private String employeeName;
    private String skillName;
    private int gap;
    private String recommendation;

    public RecommendationResponse() {
    }

    public RecommendationResponse(String employeeName, String skillName,
                                  int gap, String recommendation) {
        this.employeeName = employeeName;
        this.skillName = skillName;
        this.gap = gap;
        this.recommendation = recommendation;
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

    public int getGap() {
        return gap;
    }

    public void setGap(int gap) {
        this.gap = gap;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}