package org.example.dto;

public class NotificationResponse {

    private Long id;
    private String type;
    private String title;
    private String body;
    private String time;
    private String group;
    private boolean unread;

    public NotificationResponse() {
    }

    public NotificationResponse(Long id, String type, String title, String body, String time, String group, boolean unread) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.body = body;
        this.time = time;
        this.group = group;
        this.unread = unread;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public boolean isUnread() {
        return unread;
    }

    public void setUnread(boolean unread) {
        this.unread = unread;
    }
}
