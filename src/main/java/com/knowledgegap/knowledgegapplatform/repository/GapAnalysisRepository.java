package com.knowledgegap.knowledgegapplatform.repository;

import com.knowledgegap.knowledgegapplatform.entity.GapAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GapAnalysisRepository extends JpaRepository<GapAnalysis, Long> {

    List<GapAnalysis> findByEmployeeId(Long employeeId);

}