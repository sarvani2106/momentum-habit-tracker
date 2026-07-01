package com.momentum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.momentum.model.HabitRecord;

public interface HabitRecordRepository extends JpaRepository<HabitRecord, Long> {
    List<HabitRecord> findByUserId(Long userId);
}