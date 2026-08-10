package com.okgip.repo;

import com.okgip.model.RoleCompetency;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoleCompetencyRepository extends JpaRepository<RoleCompetency, Long> {
    List<RoleCompetency> findByJobRoleIgnoreCase(String jobRole);
    List<RoleCompetency> findByDepartmentIgnoreCase(String department);
}
