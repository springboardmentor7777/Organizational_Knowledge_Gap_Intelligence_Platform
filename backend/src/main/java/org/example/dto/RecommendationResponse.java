package org.example.dto;

public class RecommendationResponse {

    private Long employeeId;
    private String employeeName;
    private Long skillId;
    private String skillName;
    private String department;
    private String category;
    private String priority;
    private int gap;
    private String recommendation;
    private String trainingPath;
    private String provider;
    private int estimatedHours;
    private String dueIn;

    public RecommendationResponse() {
    }

    public RecommendationResponse(Long employeeId, String employeeName, Long skillId,
                                  String skillName, String department, String category,
                                  String priority, int gap, String recommendation,
                                  String trainingPath, String provider, int estimatedHours,
                                  String dueIn) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.skillId = skillId;
        this.skillName = skillName;
        this.department = department;
        this.category = category;
        this.priority = priority;
        this.gap = gap;
        this.recommendation = recommendation;
        this.trainingPath = trainingPath;
        this.provider = provider;
        this.estimatedHours = estimatedHours;
        this.dueIn = dueIn;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
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

    public String getTrainingPath() {
        return trainingPath;
    }

    public void setTrainingPath(String trainingPath) {
        this.trainingPath = trainingPath;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public int getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(int estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public String getDueIn() {
        return dueIn;
    }

    public void setDueIn(String dueIn) {
        this.dueIn = dueIn;
    }
}