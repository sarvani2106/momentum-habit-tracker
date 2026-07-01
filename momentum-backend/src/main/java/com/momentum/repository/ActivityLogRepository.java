package com.momentum.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.momentum.model.ActivityLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    Optional<ActivityLog> findByUserIdAndDate(Long userId, LocalDate date);
    List<ActivityLog> findByUserId(Long userId);
}