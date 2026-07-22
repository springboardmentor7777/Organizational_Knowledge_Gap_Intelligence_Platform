package com.knowledgegap.knowledgegapplatform.repository;

import com.knowledgegap.knowledgegapplatform.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByEmployeeId(Long employeeId);

}