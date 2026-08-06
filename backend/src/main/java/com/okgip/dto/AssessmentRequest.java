package com.okgip.dto;

import lombok.Data;
import java.util.List;

@Data
public class AssessmentRequest {
    private Long targetUserId; // Null if self-assessment
    private List<SkillRating> ratings;

    @Data
    public static class SkillRating {
        private Long skillId;
        private Integer level; // 0 to 4
    }
}
