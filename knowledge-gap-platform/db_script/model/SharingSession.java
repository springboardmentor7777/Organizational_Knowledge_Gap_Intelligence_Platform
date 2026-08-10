package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SharingSession {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne private User host;
    @ManyToOne private Skill skill;

    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDateTime scheduledAt;
    private Integer seats;
    private Integer registered;
}
