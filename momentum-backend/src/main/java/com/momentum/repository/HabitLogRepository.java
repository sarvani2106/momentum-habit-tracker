package com.momentum.repository;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.momentum.model.HabitLog;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {
    List<HabitLog> findByUserId(Long userId);
    
    List<HabitLog> findByUserIdAndCompletionDate(Long userId, LocalDate completionDate);
    
    boolean existsByHabitRecordIdAndCompletionDate(Long habitRecordId, LocalDate completionDate);
    
    List<HabitLog> findByHabitRecordIdOrderByCompletionDateDesc(Long habitRecordId);

    @Query("SELECT l.completionDate as date, COUNT(DISTINCT l.habitRecord.id) as count FROM HabitLog l WHERE l.user.id = :userId AND l.timestamp >= :startDate GROUP BY l.completionDate")
    List<Map<String, Object>> getWeeklyCompletions(@Param("userId") Long userId, @Param("startDate") LocalDateTime startDate);
}
