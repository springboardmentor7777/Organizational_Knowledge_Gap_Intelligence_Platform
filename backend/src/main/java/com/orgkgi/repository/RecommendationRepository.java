package com.orgkgi.repository;

import com.orgkgi.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByEmployeeIdOrderByScoreDesc(Long employeeId);

    List<Recommendation> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);

    List<Recommendation> findByEmployeeId(Long employeeId);

    Optional<Recommendation> findTopByEmployeeIdOrderByCreatedAtDesc(Long employeeId);

    List<Recommendation> findByEmployeeIdAndCreatedAtOrderByScoreDesc(Long employeeId, LocalDateTime createdAt);
}