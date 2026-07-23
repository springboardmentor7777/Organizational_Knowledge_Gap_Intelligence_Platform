package com.knowledgegap.dto;

public class DashboardSummaryResponse {

    private Long totalEmployees;
    private Long totalDepartments;
    private Long totalSkills;
    private Long totalCompetencies;
    private Long totalEmployeeSkills;
    private Long totalTrainingCourses;

    public DashboardSummaryResponse() {
    }

    public Long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(Long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public Long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(Long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public Long getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(Long totalSkills) {
        this.totalSkills = totalSkills;
    }

    public Long getTotalCompetencies() {
        return totalCompetencies;
    }

    public void setTotalCompetencies(Long totalCompetencies) {
        this.totalCompetencies = totalCompetencies;
    }

    public Long getTotalEmployeeSkills() {
        return totalEmployeeSkills;
    }

    public void setTotalEmployeeSkills(Long totalEmployeeSkills) {
        this.totalEmployeeSkills = totalEmployeeSkills;
    }

    public Long getTotalTrainingCourses() {
        return totalTrainingCourses;
    }

    public void setTotalTrainingCourses(Long totalTrainingCourses) {
        this.totalTrainingCourses = totalTrainingCourses;
    }
}