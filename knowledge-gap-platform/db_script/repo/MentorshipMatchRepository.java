package com.okgip.repo;

import com.okgip.model.MentorshipMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MentorshipMatchRepository extends JpaRepository<MentorshipMatch, Long> {
    List<MentorshipMatch> findByMenteeId(Long menteeId);
    List<MentorshipMatch> findByMentorId(Long mentorId);
}
