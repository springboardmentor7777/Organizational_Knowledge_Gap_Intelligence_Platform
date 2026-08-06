package com.okgip.dto;

import com.okgip.model.Skill;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GapResponse {
    private Skill skill;
    private Integer requiredLevel;
    private Integer currentLevel;
    private Integer gapScore; // requiredLevel - currentLevel (if > 0, else 0)
    private String severity; // LOW, MEDIUM, HIGH
}
