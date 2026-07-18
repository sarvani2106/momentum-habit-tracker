package com.momentum.repository;

import com.momentum.model.DailyInsight;
import com.momentum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyInsightRepository extends JpaRepository<DailyInsight, Long> {
    Optional<DailyInsight> findByUserAndDate(User user, LocalDate date);
}
