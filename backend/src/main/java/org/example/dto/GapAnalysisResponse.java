package org.example.dto;

public class GapAnalysisResponse {

    private Long employeeId;
    private String employeeName;
    private Long skillId;
    private String skillName;
    private String skillCategory;
    private String skillPriority;
    private String department;
    private int currentLevel;
    private int requiredLevel;
    private int gap;
    private int score;
    private int totalScore;
    private String assessmentStatus;
    private String recommendedAction;

    public GapAnalysisResponse() {
    }

    public GapAnalysisResponse(Long employeeId, String employeeName, Long skillId,
                               String skillName, String skillCategory, String skillPriority,
                               String department, int currentLevel, int requiredLevel,
                               int gap, int score, int totalScore,
                               String assessmentStatus, String recommendedAction) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.skillId = skillId;
        this.skillName = skillName;
        this.skillCategory = skillCategory;
        this.skillPriority = skillPriority;
        this.department = department;
        this.currentLevel = currentLevel;
        this.requiredLevel = requiredLevel;
        this.gap = gap;
        this.score = score;
        this.totalScore = totalScore;
        this.assessmentStatus = assessmentStatus;
        this.recommendedAction = recommendedAction;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillCategory() {
        return skillCategory;
    }

    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }

    public String getSkillPriority() {
        return skillPriority;
    }

    public void setSkillPriority(String skillPriority) {
        this.skillPriority = skillPriority;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public String getAssessmentStatus() {
        return assessmentStatus;
    }

    public void setAssessmentStatus(String assessmentStatus) {
        this.assessmentStatus = assessmentStatus;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }
}