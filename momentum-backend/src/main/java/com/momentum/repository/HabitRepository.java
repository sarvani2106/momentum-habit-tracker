package com.momentum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.momentum.model.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByUserId(Long userId);
}