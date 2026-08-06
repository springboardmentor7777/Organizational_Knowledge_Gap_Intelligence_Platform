package com.okgip.repository;

import com.okgip.model.MatchStatus;
import com.okgip.model.MentorshipMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentorshipMatchRepository extends JpaRepository<MentorshipMatch, Long> {
    List<MentorshipMatch> findByMentorId(Long mentorId);
    List<MentorshipMatch> findByMenteeId(Long menteeId);
    List<MentorshipMatch> findByMentorIdAndStatus(Long mentorId, MatchStatus status);
    List<MentorshipMatch> findByMenteeIdAndStatus(Long menteeId, MatchStatus status);
    List<MentorshipMatch> findByStatus(MatchStatus status);
    Optional<MentorshipMatch> findByMentorIdAndMenteeIdAndSkillId(Long mentorId, Long menteeId, Long skillId);
}
