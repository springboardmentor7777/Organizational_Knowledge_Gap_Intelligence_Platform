package com.orgkgi.dto;

public class RecommendedResourceDTO {

    private String title;
    private String type;

    public RecommendedResourceDTO() {}

    public RecommendedResourceDTO(String title, String type) {
        this.title = title;
        this.type = type;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}