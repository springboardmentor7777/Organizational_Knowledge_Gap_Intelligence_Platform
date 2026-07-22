package org.example.repository;

import org.example.model.Competency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompetencyRepository extends JpaRepository<Competency, Long> {

    Optional<Competency> findBySkillId(Long skillId);

}