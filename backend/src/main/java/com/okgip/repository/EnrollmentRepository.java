package com.okgip.repository;

import com.okgip.model.Enrollment;
import com.okgip.model.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByUserIdAndStatus(Long userId, EnrollmentStatus status);
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);
}
