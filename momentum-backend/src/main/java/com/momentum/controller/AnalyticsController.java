package com.momentum.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.repository.HabitLogRepository;
import com.momentum.repository.HabitRecordRepository;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private HabitRecordRepository habitRecordRepository;

    @Autowired
    private HabitLogRepository habitLogRepository;

    @GetMapping("/category-distribution/{userId}")
    public ResponseEntity<?> getCategoryDistribution(@PathVariable Long userId) {
        List<Map<String, Object>> distribution = habitRecordRepository.getCategoryDistribution(userId);
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/weekly-completion/{userId}")
    public ResponseEntity<?> getWeeklyCompletion(@PathVariable Long userId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Map<String, Object>> weekly = habitLogRepository.getWeeklyCompletions(userId, sevenDaysAgo);
        return ResponseEntity.ok(weekly);
    }
}
