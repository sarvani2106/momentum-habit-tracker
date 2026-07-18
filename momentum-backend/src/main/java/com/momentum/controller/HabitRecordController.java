package com.momentum.controller;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.momentum.dto.HabitCompletionResponseDTO;
import com.momentum.dto.HabitResponseDTO;
import com.momentum.model.Achievement;
import com.momentum.model.ActivityLog;
import com.momentum.model.HabitRecord;
import com.momentum.model.HabitLog;
import com.momentum.model.User;
import com.momentum.model.UserAchievement;
import com.momentum.repository.ActivityLogRepository;
import com.momentum.repository.HabitRecordRepository;
import com.momentum.repository.HabitLogRepository;
import com.momentum.repository.UserRepository;
import com.momentum.service.StreakService;

@RestController
@RequestMapping("/api/habit-records")
@CrossOrigin(origins = "http://localhost:5173")
public class HabitRecordController {

    @Autowired
    private HabitRecordRepository habitRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private HabitLogRepository habitLogRepository;

    @Autowired
    private com.momentum.repository.AchievementRepository achievementRepository;

    @Autowired
    private com.momentum.repository.UserAchievementRepository userAchievementRepository;

    @Autowired
    private StreakService streakService;

    public static class HabitRequest {
        @JsonProperty("name") private String name;
        @JsonProperty("userId") private Long userId;
        @JsonProperty("category") private String category;
        @JsonProperty("habitId") private Long habitId;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Long getHabitId() { return habitId; }
        public void setHabitId(Long habitId) { this.habitId = habitId; }
    }

    @PostMapping
    public ResponseEntity<?> createHabitRecord(@RequestBody HabitRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Habit name cannot be empty.");
        }
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) return ResponseEntity.badRequest().body("Error: User not found.");

        HabitRecord newRecord = new HabitRecord();
        newRecord.setName(request.getName()); 
        newRecord.setCategory(request.getCategory() != null ? request.getCategory() : "Custom");
        newRecord.setUser(userOptional.get()); 
        
        HabitRecord saved = habitRecordRepository.save(newRecord);
        return ResponseEntity.ok(new HabitResponseDTO(saved, false));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHabitRecords(@PathVariable Long userId) {
        List<HabitRecord> habits = habitRecordRepository.findByUserId(userId);
        LocalDate today = LocalDate.now();
        
        List<HabitResponseDTO> responseDTOs = habits.stream().map(habit -> {
            boolean completedToday = habitLogRepository.existsByHabitRecordIdAndCompletionDate(habit.getId(), today);
            return new HabitResponseDTO(habit, completedToday);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeHabit(@RequestBody HabitRequest request) {
        Optional<HabitRecord> optionalRecord = habitRecordRepository.findById(request.getHabitId());
        if (optionalRecord.isEmpty()) return ResponseEntity.badRequest().body("Error: Habit not found.");

        HabitRecord record = optionalRecord.get();
        LocalDate today = LocalDate.now();

        // Idempotency check: Already completed today?
        boolean alreadyCompleted = habitLogRepository.existsByHabitRecordIdAndCompletionDate(record.getId(), today);
        if (alreadyCompleted) {
            HabitCompletionResponseDTO res = new HabitCompletionResponseDTO();
            res.setSuccess(true);
            res.setAlreadyCompleted(true);
            res.setRecord(record);
            return ResponseEntity.ok(res);
        }

        // Record the completion
        HabitLog habitLog = new HabitLog();
        habitLog.setUser(record.getUser());
        habitLog.setHabitRecord(record);
        habitLog.setCompletionDate(today);
        habitLog.setTimestamp(java.time.LocalDateTime.now());
        habitLogRepository.save(habitLog);

        // Recalculate Streaks
        List<HabitLog> allLogs = habitLogRepository.findByHabitRecordIdOrderByCompletionDateDesc(record.getId());
        record.setCurrentStreak(streakService.calculateCurrentStreak(allLogs));
        record.setLongestStreak(streakService.calculateLongestStreak(allLogs));
        habitRecordRepository.save(record);

        // Update Heatmap (ActivityLog)
        ActivityLog log = activityLogRepository.findByUserIdAndDate(record.getUser().getId(), today)
                .orElse(new ActivityLog());
        
        if (log.getId() == null) {
            log.setUserId(record.getUser().getId());
            log.setDate(today);
        }
        log.setCompletedCount(log.getCompletedCount() + 1);
        activityLogRepository.save(log);

        // Check for achievements
        Achievement unlockedAchievement = null;
        Achievement achievement = achievementRepository.findByRequiredStreak(record.getCurrentStreak());
        if (achievement != null) {
            Optional<UserAchievement> existing = userAchievementRepository.findByUserIdAndAchievementId(record.getUser().getId(), achievement.getId());
            if (existing.isEmpty()) {
                UserAchievement ua = new UserAchievement();
                ua.setUser(record.getUser());
                ua.setAchievement(achievement);
                userAchievementRepository.save(ua);
                unlockedAchievement = achievement;
            }
        }

        // Gamification: XP and Leveling
        User user = record.getUser();
        int xpGain = 10;
        if (record.getCurrentStreak() > 0 && record.getCurrentStreak() % 7 == 0) {
            xpGain += 50;
        }
        user.setXp(user.getXp() + xpGain);
        
        int newLevel = (int) Math.floor(Math.sqrt(user.getXp() / 100.0)) + 1;
        boolean leveledUp = false;
        if (newLevel > user.getLevel()) {
            user.setLevel(newLevel);
            leveledUp = true;
        }
        userRepository.save(user);

        // Return unified DTO
        HabitCompletionResponseDTO res = new HabitCompletionResponseDTO();
        res.setSuccess(true);
        res.setAlreadyCompleted(false);
        res.setRecord(record);
        res.setXpGained(xpGain);
        res.setTotalXp(user.getXp());
        res.setLevel(user.getLevel());
        res.setLeveledUp(leveledUp);
        res.setUnlockedAchievement(unlockedAchievement);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/activity/{userId}")
    public ResponseEntity<?> getUserActivity(@PathVariable Long userId) {
        return ResponseEntity.ok(activityLogRepository.findByUserId(userId));
    }
}