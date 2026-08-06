package com.okgip.repository;

import com.okgip.model.MentorshipSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipSessionRepository extends JpaRepository<MentorshipSession, Long> {
    List<MentorshipSession> findByMatchId(Long matchId);
    List<MentorshipSession> findByMatch_MentorIdOrMatch_MenteeId(Long mentorId, Long menteeId);
}
