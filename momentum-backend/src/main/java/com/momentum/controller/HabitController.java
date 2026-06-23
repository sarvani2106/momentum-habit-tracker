package com.momentum.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.model.Habit;
import com.momentum.model.HabitRecord;
import com.momentum.repository.HabitRecordRepository;
import com.momentum.repository.HabitRepository;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {

    private final HabitRepository habitRepository;
    private final HabitRecordRepository habitRecordRepository;

    // Injecting both repositories
    public HabitController(HabitRepository habitRepository, HabitRecordRepository habitRecordRepository) {
        this.habitRepository = habitRepository;
        this.habitRecordRepository = habitRecordRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Habit> getUserHabits(@PathVariable Long userId) {
        List<Habit> habits = habitRepository.findByUserId(userId);

        // Calculate streaks for every single habit before returning them
        for (Habit habit : habits) {
            List<HabitRecord> records = habitRecordRepository.findByHabitId(habit.getId());
            calculateAndSetStreaks(habit, records);
        }

        return habits;
    }

    @PostMapping
    public ResponseEntity<Habit> createHabit(@RequestBody Habit habit) {
        Habit savedHabit = habitRepository.save(habit);
        return ResponseEntity.ok(savedHabit);
    }

    // --- THE STREAK ENGINE ALGORITHM ---
    private void calculateAndSetStreaks(Habit habit, List<HabitRecord> records) {
        if (records == null || records.isEmpty()) {
            habit.setCurrentStreak(0);
            habit.setLongestStreak(0);
            return;
        }

        // 1. Sort dates from newest to oldest and remove any potential duplicates
        List<LocalDate> sortedDates = records.stream()
                .map(HabitRecord::getCompletedDate)
                .distinct()
                .sorted((a, b) -> b.compareTo(a))
                .collect(Collectors.toList());

        int currentStreak = 0;
        int longestStreak = 0;
        int tempStreak = 1;

        LocalDate today = LocalDate.now();
        LocalDate newestDate = sortedDates.get(0);
        
        // Calculate days between today and the latest check-off
        long daysSinceLastCompletion = ChronoUnit.DAYS.between(newestDate, today);

        // Anchor Rule: Streak is only active if completed today or yesterday
        if (daysSinceLastCompletion <= 1) {
            currentStreak = 1;
        }

        // Chain Rule: Loop through history to check continuous days
        for (int i = 0; i < sortedDates.size() - 1; i++) {
            LocalDate current = sortedDates.get(i);
            LocalDate next = sortedDates.get(i + 1);
            long daysBetween = ChronoUnit.DAYS.between(next, current);

            if (daysBetween == 1) {
                tempStreak++;
                // If the current streak is active, keep incrementing it
                if (daysSinceLastCompletion <= 1 && i < currentStreak) {
                    currentStreak++;
                }
            } else {
                // Chain broken! Record the high score if it's the longest
                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }
                tempStreak = 1; // Reset tracker for next cluster
            }
        }

        // Final check for the absolute highest score
        if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
        }
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }

        // Assign the computed values back to the transient fields
        habit.setCurrentStreak(currentStreak);
        habit.setLongestStreak(longestStreak);
    }
}