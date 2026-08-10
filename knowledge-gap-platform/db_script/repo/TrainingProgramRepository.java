package com.okgip.repo;

import com.okgip.model.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
    List<TrainingProgram> findBySkillId(Long skillId);
    List<TrainingProgram> findBySkillIdIn(List<Long> skillIds);
}
