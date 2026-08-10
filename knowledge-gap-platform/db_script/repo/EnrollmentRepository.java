package com.okgip.repo;

import com.okgip.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    Optional<Enrollment> findByUserIdAndProgramId(Long userId, Long programId);
    boolean existsByUserIdAndProgramId(Long userId, Long programId);
}
