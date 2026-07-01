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
import com.momentum.model.Habit;
import com.momentum.model.User;
import com.momentum.repository.HabitRepository;
import com.momentum.repository.UserRepository;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:5173")
public class HabitController {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private UserRepository userRepository;

    // The strict JSON Catcher
    public static class HabitRequest {
        @JsonProperty("name")
        private String name;
        @JsonProperty("userId")
        private Long userId;
        @JsonProperty("category")
        private String category;
        @JsonProperty("habitId")
        private Long habitId;

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
    public ResponseEntity<?> createHabit(@RequestBody HabitRequest request) {
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: User not found.");
        }

        Habit newHabit = new Habit();
        newHabit.setName(request.getName());
        newHabit.setCategory(request.getCategory() != null ? request.getCategory() : "Custom");
        newHabit.setUser(userOptional.get()); 

        Habit savedHabit = habitRepository.save(newHabit);
        return ResponseEntity.ok(savedHabit);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHabits(@PathVariable Long userId) {
        List<Habit> userHabits = habitRepository.findByUserId(userId);
        return ResponseEntity.ok(userHabits);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeHabit(@RequestBody HabitRequest request) {
        Optional<Habit> optionalHabit = habitRepository.findById(request.getHabitId());
        if (optionalHabit.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Habit not found.");
        }

        Habit habit = optionalHabit.get();
        habit.setCurrentStreak(habit.getCurrentStreak() + 1);
        
        if (habit.getCurrentStreak() > habit.getLongestStreak()) {
            habit.setLongestStreak(habit.getCurrentStreak());
        }

        habitRepository.save(habit);
        return ResponseEntity.ok(habit);
    }
}