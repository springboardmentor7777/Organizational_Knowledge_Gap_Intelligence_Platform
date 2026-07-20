package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Recommendation;

import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByEmployeeId(Long employeeId);
    List<Recommendation> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);
    
    // Add this method to support ranked retrieval
    List<Recommendation> findByEmployeeIdOrderByScoreDesc(Long employeeId);
}