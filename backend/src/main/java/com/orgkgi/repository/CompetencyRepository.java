package com.orgkgi.repository;

import com.orgkgi.entity.Competency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetencyRepository extends JpaRepository<Competency, Long> {

    List<Competency> findByDepartmentId(Long departmentId);

}