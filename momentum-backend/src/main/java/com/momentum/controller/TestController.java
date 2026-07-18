package com.momentum.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.model.ActivityLog;
import com.momentum.model.HabitLog;
import com.momentum.model.HabitRecord;
import com.momentum.model.User;
import com.momentum.repository.ActivityLogRepository;
import com.momentum.repository.HabitLogRepository;
import com.momentum.repository.HabitRecordRepository;
import com.momentum.repository.UserRepository;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @Autowired private UserRepository userRepository;
    @Autowired private HabitRecordRepository habitRecordRepository;
    @Autowired private ActivityLogRepository activityLogRepository;
    @Autowired private HabitLogRepository habitLogRepository;

    @PostMapping("/seed/{userId}")
    public ResponseEntity<?> seedTestData(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        User user;
        if (userOpt.isEmpty()) {
            user = new User();
            user.setId(userId);
            user.setUsername("Test User");
            user.setEmail("test@example.com");
            user = userRepository.save(user);
        } else {
            user = userOpt.get();
        }

        // Create a 7-day streak habit
        HabitRecord habit = new HabitRecord();
        habit.setName("Morning Run");
        habit.setCategory("Health");
        habit.setUser(user);
        habit.setCurrentStreak(6); // Set to 6 so next completion awards 7-day badge
        habit.setLongestStreak(6);
        habit = habitRecordRepository.save(habit);

        // Seed logs for the past 7 days to populate the Weekly Completion Chart
        for (int i = 0; i < 7; i++) {
            LocalDateTime timestamp = LocalDateTime.now().minusDays(i);
            
            // Heatmap activity log
            ActivityLog log = new ActivityLog();
            log.setUserId(user.getId());
            log.setDate(timestamp.toLocalDate());
            log.setCompletedCount(1);
            activityLogRepository.save(log);

            // Weekly completion log
            HabitLog hLog = new HabitLog();
            hLog.setUser(user);
            hLog.setHabitRecord(habit);
            hLog.setTimestamp(timestamp);
            habitLogRepository.save(hLog);
        }

        return ResponseEntity.ok("Test data seeded! Habit 'Morning Run' created with 6 day streak. Go click 'Complete' to hit 7 days and earn the badge!");
    }
}
