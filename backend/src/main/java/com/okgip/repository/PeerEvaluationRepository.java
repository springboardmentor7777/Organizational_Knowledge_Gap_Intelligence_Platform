package com.okgip.repository;

import com.okgip.model.PeerEvaluation;
import com.okgip.model.PeerEvaluation.EvaluationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeerEvaluationRepository extends JpaRepository<PeerEvaluation, Long> {
    List<PeerEvaluation> findByEvaluatorIdAndStatus(Long evaluatorId, EvaluationStatus status);
    List<PeerEvaluation> findByEvaluateeIdAndStatus(Long evaluateeId, EvaluationStatus status);
    List<PeerEvaluation> findByEvaluateeId(Long evaluateeId);

    @Query("SELECT AVG(p.rating) FROM PeerEvaluation p WHERE p.evaluatee.id = :evaluateeId AND p.skill.id = :skillId AND p.status = 'COMPLETED'")
    Double getAveragePeerRatingForSkill(@Param("evaluateeId") Long evaluateeId, @Param("skillId") Long skillId);
}
