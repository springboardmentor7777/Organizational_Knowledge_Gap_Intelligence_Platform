package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private Assessment assessment;

    @Column(length = 1000)
    private String text;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctOption; // "A" | "B" | "C" | "D"

    @Column(length = 1000)
    private String explanation;

    @Builder.Default
    private Integer weight = 1;
}
