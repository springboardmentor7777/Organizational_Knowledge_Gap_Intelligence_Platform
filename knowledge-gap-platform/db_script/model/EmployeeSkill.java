package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EmployeeSkill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User user;
    @ManyToOne(optional = false) private Skill skill;

    @Enumerated(EnumType.STRING)
    private Proficiency level;

    private String source; // SELF, PEER, MANAGER, ASSESSMENT
}
