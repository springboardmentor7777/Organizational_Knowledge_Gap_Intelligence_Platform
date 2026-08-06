package com.okgip.service;

import com.okgip.dto.GapResponse;
import com.okgip.model.*;
import com.okgip.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class MentorshipService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    MentorshipMatchRepository mentorshipMatchRepository;

    @Autowired
    MentorshipSessionRepository mentorshipSessionRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    GapAnalysisService gapAnalysisService;

    @Autowired
    NotificationService notificationService;

    public List<Map<String, Object>> findPotentialMentors(Long userId) {
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<GapResponse> gaps = gapAnalysisService.calculateUserGaps(userId);
        
        List<Map<String, Object>> options = new ArrayList<>();
        
        for (GapResponse gap : gaps) {
            Skill skill = gap.getSkill();
            // Find other users who have this skill rated at level >= 3 (Advanced/Expert)
            List<EmployeeSkill> experts = employeeSkillRepository.findAll().stream()
                    .filter(es -> es.getSkill().getId().equals(skill.getId()) 
                            && es.getProficiencyLevel() >= 3 
                            && !es.getUser().getId().equals(userId))
                    .collect(Collectors.toList());

            // Pre-resolve expert levels (MANAGER > PEER > SELF)
            Map<Long, User> expertUsers = new HashMap<>();
            Map<Long, Integer> userLevels = new HashMap<>();
            for (EmployeeSkill es : experts) {
                Long id = es.getUser().getId();
                expertUsers.put(id, es.getUser());
                userLevels.put(id, Math.max(userLevels.getOrDefault(id, 0), es.getProficiencyLevel()));
            }

            for (Map.Entry<Long, Integer> entry : userLevels.entrySet()) {
                User mentor = expertUsers.get(entry.getKey());
                Map<String, Object> option = new HashMap<>();
                option.put("skill", skill);
                option.put("gapScore", gap.getGapScore());
                option.put("mentor", mentor);
                option.put("mentorLevel", entry.getValue());
                options.add(option);
            }
        }
        return options;
    }

    @Transactional
    public MentorshipMatch requestMentorship(Long menteeId, Long mentorId, Long skillId) {
        User mentee = userRepository.findById(menteeId).orElseThrow();
        User mentor = userRepository.findById(mentorId).orElseThrow();
        Skill skill = skillRepository.findById(skillId).orElseThrow();

        Optional<MentorshipMatch> existing = mentorshipMatchRepository
                .findByMentorIdAndMenteeIdAndSkillId(mentorId, menteeId, skillId);
        
        if (existing.isPresent()) {
            return existing.get();
        }

        MentorshipMatch match = MentorshipMatch.builder()
                .mentee(mentee)
                .mentor(mentor)
                .skill(skill)
                .status(MatchStatus.PENDING)
                .build();

        MentorshipMatch saved = mentorshipMatchRepository.save(match);

        // Notify the mentor
        notificationService.createNotification(
                mentor,
                String.format("%s has requested your mentorship for the skill '%s'.", mentee.getFullName(), skill.getName()),
                NotificationType.MENTORSHIP
        );

        return saved;
    }

    public MentorshipMatch updateMatchStatus(Long matchId, String statusStr) {
        MentorshipMatch match = mentorshipMatchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        MatchStatus status = MatchStatus.valueOf(statusStr.toUpperCase());
        match.setStatus(status);
        MentorshipMatch saved = mentorshipMatchRepository.save(match);

        // Notify the mentee
        notificationService.createNotification(
                match.getMentee(),
                String.format("Your mentorship request for '%s' with %s has been %s.", 
                        match.getSkill().getName(), match.getMentor().getFullName(), status.name()),
                NotificationType.MENTORSHIP
        );

        return saved;
    }

    public MentorshipSession scheduleSession(Long matchId, String title, LocalDateTime time, Integer duration) {
        MentorshipMatch match = mentorshipMatchRepository.findById(matchId).orElseThrow();
        
        MentorshipSession session = MentorshipSession.builder()
                .match(match)
                .title(title)
                .scheduledAt(time)
                .durationMinutes(duration)
                .status(SessionStatus.SCHEDULED)
                .build();

        MentorshipSession saved = mentorshipSessionRepository.save(session);

        // Notify both mentor and mentee
        String msg = String.format("New mentorship session '%s' scheduled for '%s' on %s.", 
                title, match.getSkill().getName(), time.toString());
        
        notificationService.createNotification(match.getMentor(), msg, NotificationType.MENTORSHIP);
        notificationService.createNotification(match.getMentee(), msg, NotificationType.MENTORSHIP);

        return saved;
    }

    public List<MentorshipMatch> getUserMatches(Long userId) {
        List<MentorshipMatch> matches = new ArrayList<>();
        matches.addAll(mentorshipMatchRepository.findByMentorId(userId));
        matches.addAll(mentorshipMatchRepository.findByMenteeId(userId));
        return matches;
    }

    public List<MentorshipSession> getUserSessions(Long userId) {
        return mentorshipSessionRepository.findByMatch_MentorIdOrMatch_MenteeId(userId, userId);
    }
}
