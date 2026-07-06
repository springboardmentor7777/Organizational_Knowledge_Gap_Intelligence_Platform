package com.knowledgegap.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String status;
    private String role;
    private String department;
}