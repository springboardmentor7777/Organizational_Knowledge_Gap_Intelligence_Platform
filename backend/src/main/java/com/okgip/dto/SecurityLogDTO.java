package com.okgip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SecurityLogDTO {
    private Long id;
    private String action;
    private String performedBy;
    private LocalDateTime timestamp;
    private String details;
}
