package com.momentum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.repository.UserAchievementRepository;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class AchievementController {

    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAchievements(@PathVariable Long userId) {
        return ResponseEntity.ok(userAchievementRepository.findByUserId(userId));
    }
}
