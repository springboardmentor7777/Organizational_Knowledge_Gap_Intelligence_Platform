package org.example.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.example.dto.LearningProgressResponse;
import org.example.dto.LearningProgressResponse.Badge;
import org.example.dto.LearningProgressResponse.Course;
import org.example.dto.LearningProgressResponse.Goal;
import org.example.dto.LearningProgressResponse.Platform;
import org.example.dto.LearningProgressResponse.Stat;
import org.example.dto.LearningProgressResponse.TimelineItem;
import org.example.model.EmployeeLearningProgress;
import org.example.model.EmployeeSkill;
import org.example.repository.EmployeeSkillRepository;
import org.example.repository.LearningProgressRepository;
import org.springframework.stereotype.Service;

@Service
public class LearningService {

    private final EmployeeSkillRepository employeeSkillRepository;
    private final LearningProgressRepository learningProgressRepository;

    public LearningService(
            EmployeeSkillRepository employeeSkillRepository,
            LearningProgressRepository learningProgressRepository) {

        this.employeeSkillRepository = employeeSkillRepository;
        this.learningProgressRepository = learningProgressRepository;
    }

    public LearningProgressResponse getLearningProgressForEmployee(Long employeeId) {

        List<EmployeeSkill> employeeSkills =
                employeeSkillRepository.findByEmployeeId(employeeId);

        List<EmployeeLearningProgress> learningProgress =
                learningProgressRepository.findByEmployeeId(employeeId);

        int completedCourses = 0;
        int hoursLearned = 0;

        for (EmployeeLearningProgress progress : learningProgress) {

            if (progress.isCompleted()) {
                completedCourses++;
            }

            hoursLearned += progress.getHoursLearned();
        }

        Course[] courses = buildCourses(employeeSkills, learningProgress);

        /*
 * Calculate badges from learning progress.
 */
boolean hasCompletedCourse = false;
boolean hasHighScore = false;

for (EmployeeLearningProgress progress : learningProgress) {

    if (progress.isCompleted()) {
        hasCompletedCourse = true;

        if (progress.getScore() != null && progress.getScore() >= 90) {
            hasHighScore = true;
        }
    }
}

boolean fastStarter = hasCompletedCourse;
boolean streakKeeper = false;
boolean skillBuilder = hasCompletedCourse;
boolean certified = hasHighScore;

int badgesEarned = 0;

if (fastStarter) {
    badgesEarned++;
}

if (streakKeeper) {
    badgesEarned++;
}

if (skillBuilder) {
    badgesEarned++;
}

if (certified) {
    badgesEarned++;
}

Stat[] stats = new Stat[]{
        new Stat(
                "Courses Completed",
                String.valueOf(completedCourses),
                "BookOpenCheck",
                "primary"
        ),
        new Stat(
                "Hours Learned",
                String.valueOf(hoursLearned),
                "Clock",
                "secondary"
        ),
        new Stat(
                "Current Streak",
                "0",
                "Flame",
                "warning"
        ),
        new Stat(
                "Badges Earned",
                String.valueOf(badgesEarned),
                "Medal",
                "success"
        )
};

/*
 * Build Activity Timeline from employee learning progress.
 */
List<TimelineItem> timelineList = new ArrayList<>();

DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern("MMM d, yyyy");

for (EmployeeLearningProgress progress : learningProgress) {

    if (progress.getCourse() == null) {
        continue;
    }

    String courseTitle = progress.getCourse().getTitle();

    /*
     * Completed course
     */
    if (progress.isCompleted()) {

        String date = "Recently";

        if (progress.getCompletedAt() != null) {
            date = progress.getCompletedAt().format(formatter);
        }

        timelineList.add(
                new TimelineItem(
                        "Completed \"" + courseTitle + "\"",
                        date,
                        "course"
                )
        );

    /*
     * Course currently in progress
     */
    } else if (progress.getProgress() > 0) {

        String date = "In progress";

        if (progress.getStartedAt() != null) {
            date = progress.getStartedAt().format(formatter);
        }

        timelineList.add(
                new TimelineItem(
                        "Started \"" + courseTitle + "\"",
                        date,
                        "course"
                )
        );
    }
}

TimelineItem[] timeline =
        timelineList.toArray(new TimelineItem[0]);

/*
 * Badges calculated from learning progress.
 */
Badge[] badges = new Badge[]{
        new Badge(
                "Fast Starter",
                fastStarter,
                "Complete your first learning course."
        ),
        new Badge(
                "Streak Keeper",
                streakKeeper,
                "Maintain a consistent learning streak."
        ),
        new Badge(
                "Skill Builder",
                skillBuilder,
                "Complete courses related to your skill gaps."
        ),
        new Badge(
                "Certified",
                certified,
                "Earn your first professional certification."
        )
};
        /*
         * Platforms remain unchanged.
         */
        Platform[] platforms = new Platform[]{
                new Platform(
                        "Infosys Springboard",
                        "Internal",
                        42,
                        "primary"
                ),
                new Platform(
                        "Coursera",
                        "External",
                        1200,
                        "#0056D3"
                ),
                new Platform(
                        "LinkedIn Learning",
                        "External",
                        890,
                        "#0A66C2"
                ),
                new Platform(
                        "Udemy",
                        "External",
                        3400,
                        "#A435F0"
                )
        };

        /*
         * Goals remain unchanged for now.
         */
        Goal[] goals = new Goal[]{
                new Goal(
                        "Complete your recommended learning path",
                        "Dec 31, 2026",
                        0,
                        "On Track"
                ),
                new Goal(
                        "Improve high-priority skills",
                        "Dec 31, 2026",
                        0,
                        "On Track"
                )
        };

        return new LearningProgressResponse(
                stats,
                timeline,
                badges,
                courses,
                platforms,
                goals
        );
    }

    private Course[] buildCourses(
            List<EmployeeSkill> employeeSkills,
            List<EmployeeLearningProgress> learningProgress) {

        if (employeeSkills == null || employeeSkills.isEmpty()) {
            return new Course[0];
        }

        return employeeSkills.stream()
                .map(employeeSkill -> {

                    String skillName =
                            employeeSkill.getSkill().getSkillName();

                    String level =
                            employeeSkill.getSkill().getLevel();

                    String priority =
                            employeeSkill.getSkill().getPriority();

                    int proficiency =
                            employeeSkill.getProficiencyLevel();

                    int match =
                            calculateMatch(priority, proficiency);

                    String difficulty =
                            getDifficulty(level);

                    String tag =
                            "High".equalsIgnoreCase(priority)
                                    ? "High Priority Skill"
                                    : "Skill Development";

                    String reason =
                            "Recommended because your current "
                                    + skillName
                                    + " proficiency is level "
                                    + proficiency
                                    + " and this is a "
                                    + priority
                                    + " priority skill.";

                    int progress = 0;

                    for (EmployeeLearningProgress learning :
                            learningProgress) {

                        if (learning.getCourse() != null
                                && learning.getCourse().getSkill() != null
                                && learning.getCourse().getSkill().getId()
                                .equals(employeeSkill.getSkill().getId())) {

                            progress = learning.getProgress();
                            break;
                        }
                    }

                    return new Course(
                            skillName + " Learning Path",
                            "Infosys Springboard",
                            "Internal",
                            difficulty,
                            8,
                            match,
                            progress,
                            tag,
                            reason
                    );
                })
                .toArray(Course[]::new);
    }

    private int calculateMatch(
            String priority,
            int proficiency) {

        int match = 60;

        if ("High".equalsIgnoreCase(priority)) {
            match += 20;
        }

        if (proficiency <= 3) {
            match += 15;
        }

        if (proficiency >= 4) {
            match += 5;
        }

        return Math.min(match, 99);
    }

    private String getDifficulty(String level) {

        if (level == null) {
            return "Intermediate";
        }

        if (level.equalsIgnoreCase("Advanced")) {
            return "Advanced";
        }

        if (level.equalsIgnoreCase("Beginner")) {
            return "Beginner";
        }

        return "Intermediate";
    }
}