package com.momentum.controller;

import java.util.List;
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
import com.momentum.model.HabitRecord;
import com.momentum.model.User;
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

    // --- STRICT JSON CATCHER ---
    // This forces Spring Boot to perfectly map the incoming React data
    public static class HabitRequest {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("userId")
        private Long userId;
        
        @JsonProperty("category")
        private String category;
        
        @JsonProperty("habitId")
        private Long habitId;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        
        public Long getHabitId() { return habitId; }
        public void setHabitId(Long habitId) { this.habitId = habitId; }
    }

    // 1. CREATE HABIT
    @PostMapping
    public ResponseEntity<?> createHabitRecord(@RequestBody HabitRequest request) {
        // Safety check to ensure the name isn't blank
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Habit name cannot be empty.");
        }

        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: User not found.");
        }

        HabitRecord newRecord = new HabitRecord();
        newRecord.setName(request.getName()); 
        newRecord.setCategory(request.getCategory() != null ? request.getCategory() : "Custom");
        newRecord.setUser(userOptional.get()); 

        HabitRecord savedRecord = habitRecordRepository.save(newRecord);
        return ResponseEntity.ok(savedRecord);
    }

    // 2. GET USER HABITS
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHabitRecords(@PathVariable Long userId) {
        List<HabitRecord> userRecords = habitRecordRepository.findByUserId(userId);
        return ResponseEntity.ok(userRecords);
    }

    // 3. COMPLETE HABIT
    @PostMapping("/complete")
    public ResponseEntity<?> completeHabit(@RequestBody HabitRequest request) {
        if (request.getHabitId() == null) {
            return ResponseEntity.badRequest().body("Error: Habit ID is missing.");
        }

        Optional<HabitRecord> optionalRecord = habitRecordRepository.findById(request.getHabitId());
        if (optionalRecord.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Habit not found.");
        }

        HabitRecord record = optionalRecord.get();
        
        // Increase the streak
        record.setCurrentStreak(record.getCurrentStreak() + 1);
        
        // Update high score if necessary
        if (record.getCurrentStreak() > record.getLongestStreak()) {
            record.setLongestStreak(record.getCurrentStreak());
        }

        habitRecordRepository.save(record);
        return ResponseEntity.ok(record);
    }
}