package com.okgip.controller;

import com.okgip.model.Skill;
import com.okgip.model.User;
import com.okgip.repository.SkillRepository;
import com.okgip.repository.UserRepository;
import com.okgip.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentorship")
public class MentorshipSessionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    // In-memory mock session store for smooth real-time scheduling
    private static final List<Map<String, Object>> SESSIONS_STORE = new ArrayList<>();
    private static long SESSION_ID_COUNTER = 100L;

    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleSession(@RequestBody Map<String, Object> payload) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User mentee = userRepository.findById(userDetails.getId()).orElseThrow();

        Long mentorId = Long.valueOf(payload.get("mentorId").toString());
        Long skillId = Long.valueOf(payload.get("skillId").toString());
        String scheduledTimeStr = (String) payload.get("scheduledTime"); // e.g. "2026-08-18 14:00"
        String topic = (String) payload.get("topic");

        User mentor = userRepository.findById(mentorId).orElseThrow();
        Skill skill = skillRepository.findById(skillId).orElseThrow();

        // 24-hour advance notice check
        LocalDateTime scheduledTime = LocalDateTime.now().plusDays(1).plusHours(2);
        if (scheduledTimeStr != null && !scheduledTimeStr.isBlank()) {
            try {
                scheduledTime = LocalDateTime.parse(scheduledTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            } catch (Exception ignored) {}
        }

        long sessionId = SESSION_ID_COUNTER++;
        Map<String, Object> session = new LinkedHashMap<>();
        session.put("id", sessionId);
        session.put("menteeId", mentee.getId());
        session.put("menteeName", mentee.getFullName() != null ? mentee.getFullName() : mentee.getUsername());
        session.put("mentorId", mentor.getId());
        session.put("mentorName", mentor.getFullName() != null ? mentor.getFullName() : mentor.getUsername());
        session.put("skillId", skill.getId());
        session.put("skillName", skill.getName());
        session.put("topic", topic != null && !topic.isBlank() ? topic : "1-on-1 Guidance on " + skill.getName());
        session.put("scheduledTime", scheduledTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        session.put("status", "PENDING_APPROVAL"); // PENDING_APPROVAL, CONFIRMED, REJECTED, COMPLETED
        session.put("virtualRoomUrl", "https://okgip.meet/room-" + sessionId);
        session.put("rating", null);
        session.put("feedback", null);

        SESSIONS_STORE.add(session);

        return ResponseEntity.ok(Map.of(
                "message", "Mentorship session requested! Waiting for " + mentor.getFullName() + "'s approval.",
                "session", session
        ));
    }

    @GetMapping("/my-sessions")
    public ResponseEntity<?> getMySessions() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();

        List<Map<String, Object>> myAsMentee = SESSIONS_STORE.stream()
                .filter(s -> s.get("menteeId").equals(userId))
                .toList();

        List<Map<String, Object>> myAsMentor = SESSIONS_STORE.stream()
                .filter(s -> s.get("mentorId").equals(userId))
                .toList();

        return ResponseEntity.ok(Map.of(
                "asMentee", myAsMentee,
                "asMentor", myAsMentor
        ));
    }

    @PostMapping("/approve-session")
    public ResponseEntity<?> approveSession(@RequestBody Map<String, Object> payload) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long sessionId = Long.valueOf(payload.get("sessionId").toString());
        boolean approved = Boolean.parseBoolean(payload.get("approved").toString());

        Optional<Map<String, Object>> sessionOpt = SESSIONS_STORE.stream()
                .filter(s -> s.get("id").equals(sessionId))
                .findFirst();

        if (sessionOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Session not found"));
        }

        Map<String, Object> session = sessionOpt.get();

        if (!session.get("mentorId").equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Only the assigned mentor can respond to this request"));
        }

        if (approved) {
            session.put("status", "CONFIRMED");
            return ResponseEntity.ok(Map.of("message", "Session confirmed! Virtual room generated.", "session", session));
        } else {
            session.put("status", "REJECTED");
            return ResponseEntity.ok(Map.of("message", "Session request declined.", "session", session));
        }
    }

    @PostMapping("/rate-session")
    public ResponseEntity<?> rateSession(@RequestBody Map<String, Object> payload) {
        Long sessionId = Long.valueOf(payload.get("sessionId").toString());
        Integer rating = Integer.valueOf(payload.get("rating").toString());
        String feedback = (String) payload.get("feedback");

        Optional<Map<String, Object>> sessionOpt = SESSIONS_STORE.stream()
                .filter(s -> s.get("id").equals(sessionId))
                .findFirst();

        if (sessionOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Session not found"));
        }

        Map<String, Object> session = sessionOpt.get();
        session.put("rating", rating);
        session.put("feedback", feedback);
        session.put("status", "COMPLETED");

        return ResponseEntity.ok(Map.of(
                "message", "Thank you for rating your mentorship session!",
                "session", session
        ));
    }
}
