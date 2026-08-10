package com.okgip.repo;

import com.okgip.model.AssessmentAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssessmentAttemptRepository extends JpaRepository<AssessmentAttempt, Long> {
    List<AssessmentAttempt> findByUserIdOrderBySubmittedAtDesc(Long userId);
}
