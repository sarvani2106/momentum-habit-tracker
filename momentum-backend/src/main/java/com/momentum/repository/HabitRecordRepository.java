package com.momentum.repository;

import java.util.List;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.momentum.model.HabitRecord;

public interface HabitRecordRepository extends JpaRepository<HabitRecord, Long> {
    List<HabitRecord> findByUserId(Long userId);

    @Query("SELECT h.category as category, COUNT(h) as count FROM HabitRecord h WHERE h.user.id = :userId GROUP BY h.category")
    List<Map<String, Object>> getCategoryDistribution(@Param("userId") Long userId);
}