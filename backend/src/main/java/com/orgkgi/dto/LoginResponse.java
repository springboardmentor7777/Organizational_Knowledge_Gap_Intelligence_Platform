package com.orgkgi.dto;

public class LoginResponse {

    private String token;
    private String message;

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }
}
