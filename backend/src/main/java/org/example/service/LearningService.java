package org.example.service;

import org.example.dto.LearningProgressResponse;
import org.example.dto.LearningProgressResponse.Badge;
import org.example.dto.LearningProgressResponse.Course;
import org.example.dto.LearningProgressResponse.Goal;
import org.example.dto.LearningProgressResponse.Platform;
import org.example.dto.LearningProgressResponse.Stat;
import org.example.dto.LearningProgressResponse.TimelineItem;
import org.springframework.stereotype.Service;

@Service
public class LearningService {

    public LearningProgressResponse getLearningProgressForEmployee(Long employeeId) {
        Stat[] stats = new Stat[]{
                new Stat("Courses Completed", "17", "BookOpenCheck", "primary"),
                new Stat("Hours Learned", "96", "Clock", "secondary"),
                new Stat("Current Streak", "32", "Flame", "warning"),
                new Stat("Badges Earned", "6", "Medal", "success")
        };

        TimelineItem[] timeline = new TimelineItem[]{
                new TimelineItem("Completed “Applied Cloud Security”", "Jul 24, 2026", "course"),
                new TimelineItem("Earned “Security Sprinter” badge", "Jul 24, 2026", "badge"),
                new TimelineItem("Completed “GraphQL in Production”", "Jul 10, 2026", "course"),
                new TimelineItem("Reached 90-day learning streak", "Jun 29, 2026", "milestone"),
                new TimelineItem("Completed “System Design Foundations”", "Jun 2, 2026", "course")
        };

        Badge[] badges = new Badge[]{
                new Badge("Fast Starter", true, "Completed your first course within a week of joining."),
                new Badge("Security Sprinter", true, "Completed 3 security courses in a single quarter."),
                new Badge("Streak Keeper", true, "Maintained a 30-day learning streak."),
                new Badge("Mentor's Pick", true, "Recommended a resource that a mentor endorsed."),
                new Badge("Certified", true, "Earned your first professional certification."),
                new Badge("Team Player", true, "Completed a course alongside 3+ teammates."),
                new Badge("Architect", false, "Complete the full Cloud Architecture learning path."),
                new Badge("Century Club", false, "Reach 100 total hours of completed training.")
        };

        Course[] courses = new Course[]{
                new Course("Applied Cloud Security", "Infosys Springboard", "Internal", "Intermediate", 6, 96, 50,
                        "Closes Critical Gap", "Your Cloud Security score is 35 vs. a required 90 — the widest gap on your profile. This course targets exactly that delta."),
                new Course("AWS Certified Developer – Associate Prep", "Coursera", "External", "Advanced", 18, 89, 0,
                        "Certification path", "Builds directly on Applied Cloud Security and leads to an industry-recognized certification your role requires within 2 quarters."),
                new Course("System Design Foundations", "Infosys Springboard", "Internal", "Intermediate", 8, 81, 100,
                        "Completed", "Matched to your System Design gap (62 vs. 85 required) — you've already completed this one."),
                new Course("Leading Distributed Teams", "LinkedIn Learning", "External", "Beginner", 4, 74, 0,
                        "Leadership track", "You're being considered for a tech-lead track; this closes part of the Leadership gap flagged in your last review."),
                new Course("Advanced Threat Modeling", "Udemy", "External", "Advanced", 10, 88, 0,
                        "Closes Critical Gap", "A natural follow-on to Cloud Security fundamentals; addresses the Security category which is your lowest-scoring area org-wide."),
                new Course("GraphQL in Production", "Infosys Springboard", "Internal", "Intermediate", 5, 68, 0,
                        "Skill refresh", "Your GraphQL score (70) is solid but slightly below the Senior Engineer benchmark of 80.")
        };

        Platform[] platforms = new Platform[]{
                new Platform("Infosys Springboard", "Internal", 42, "primary"),
                new Platform("Coursera", "External", 1200, "#0056D3"),
                new Platform("LinkedIn Learning", "External", 890, "#0A66C2"),
                new Platform("Udemy", "External", 3400, "#A435F0")
        };

        Goal[] goals = new Goal[]{
                new Goal("Complete AWS Certified Developer path", "Sep 30, 2026", 45, "On Track"),
                new Goal("Finish Advanced Threat Modeling", "Aug 15, 2026", 15, "At Risk"),
                new Goal("Reach 120 total learning hours", "Dec 31, 2026", 80, "On Track")
        };

        return new LearningProgressResponse(stats, timeline, badges, courses, platforms, goals);
    }
}
