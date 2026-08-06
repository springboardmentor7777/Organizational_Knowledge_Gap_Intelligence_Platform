package com.okgip.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role_requirements", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"role", "department", "skill_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String role; // Stores role name like EMPLOYEE, MANAGER, etc.

    @Column(nullable = false, length = 50)
    private String department;

    @ManyToOne(optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "required_level", nullable = false)
    private Integer requiredLevel; // 0 to 4
}
