package org.example.repository;

import java.util.List;

import org.example.model.Notification;
import org.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientUserOrderByCreatedAtDesc(User recipientUser);
    List<Notification> findByTargetUserOrderByCreatedAtDesc(User targetUser);
    List<Notification> findByTargetDepartmentOrderByCreatedAtDesc(String targetDepartment);
    List<Notification> findByTargetManagerIdOrderByCreatedAtDesc(Long targetManagerId);
}
