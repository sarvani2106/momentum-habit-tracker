package com.momentum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.momentum.model.Achievement;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    Achievement findByName(String name);
    Achievement findByRequiredStreak(int requiredStreak);
}
