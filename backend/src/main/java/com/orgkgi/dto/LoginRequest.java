package com.orgkgi.dto;

public class LoginRequest {

    private String username;
    private String password;

    // Getters
    public String getUsername() {
        return username;
    }

    // Helper method to support both naming conventions if referenced elsewhere
    public String getUsernameOrEmail() {
        return username;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.username = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}