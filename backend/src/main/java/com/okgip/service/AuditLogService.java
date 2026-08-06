package com.okgip.service;

import com.okgip.dto.SecurityLogDTO;
import com.okgip.model.AuditLog;
import com.okgip.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logEvent(String action, String performedBy, String details) {
        try {
            AuditLog log = AuditLog.builder()
                    .action(action)
                    .performedBy(performedBy)
                    .details(details)
                    .build();
            auditLogRepository.save(log);
        } catch (Exception e) {
            // Silently swallow log exceptions to avoid interrupting primary auth flow
        }
    }

    public List<SecurityLogDTO> getUserLogs(String username) {
        return auditLogRepository.findTop20ByPerformedByOrderByTimestampDesc(username)
                .stream()
                .map(log -> SecurityLogDTO.builder()
                        .id(log.getId())
                        .action(log.getAction())
                        .performedBy(log.getPerformedBy())
                        .timestamp(log.getTimestamp())
                        .details(log.getDetails())
                        .build())
                .collect(Collectors.toList());
    }
}
