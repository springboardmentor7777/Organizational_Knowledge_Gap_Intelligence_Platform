package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employee_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "skill_id", "source"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "proficiency_level", nullable = false)
    private Integer proficiencyLevel; // 0 to 4

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Source source; // SELF, PEER, MANAGER

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
