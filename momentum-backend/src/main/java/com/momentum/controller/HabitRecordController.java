package com.momentum.controller;

import java.time.LocalDate;
import java.util.Optional;

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
import com.momentum.model.ActivityLog;
import com.momentum.model.HabitRecord;
import com.momentum.model.User;
import com.momentum.repository.ActivityLogRepository;
import com.momentum.repository.HabitRecordRepository;
import com.momentum.repository.UserRepository;

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

        return ResponseEntity.ok(habitRecordRepository.save(newRecord));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHabitRecords(@PathVariable Long userId) {
        return ResponseEntity.ok(habitRecordRepository.findByUserId(userId));
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeHabit(@RequestBody HabitRequest request) {
        Optional<HabitRecord> optionalRecord = habitRecordRepository.findById(request.getHabitId());
        if (optionalRecord.isEmpty()) return ResponseEntity.badRequest().body("Error: Habit not found.");

        HabitRecord record = optionalRecord.get();
        record.setCurrentStreak(record.getCurrentStreak() + 1);
        if (record.getCurrentStreak() > record.getLongestStreak()) {
            record.setLongestStreak(record.getCurrentStreak());
        }
        habitRecordRepository.save(record);

        // Update Heatmap
        LocalDate today = LocalDate.now();
        ActivityLog log = activityLogRepository.findByUserIdAndDate(record.getUser().getId(), today)
                .orElse(new ActivityLog());
        
        if (log.getId() == null) {
            log.setUserId(record.getUser().getId());
            log.setDate(today);
        }
        log.setCompletedCount(log.getCompletedCount() + 1);
        activityLogRepository.save(log);

        return ResponseEntity.ok(record);
    }

    @GetMapping("/activity/{userId}")
    public ResponseEntity<?> getUserActivity(@PathVariable Long userId) {
        return ResponseEntity.ok(activityLogRepository.findByUserId(userId));
    }
}