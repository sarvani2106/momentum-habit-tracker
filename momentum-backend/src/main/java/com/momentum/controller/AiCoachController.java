package com.momentum.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.dto.AiCoachResponse;
import com.momentum.service.AiCoachService;
import com.momentum.model.User;
import com.momentum.repository.UserRepository;

@RestController
@RequestMapping("/api/coach")
@CrossOrigin(origins = "http://localhost:5173")
public class AiCoachController {

    @Autowired
    private AiCoachService aiCoachService;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/insight/{userId}")
    public ResponseEntity<?> getDailyInsight(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            Map<String, String> res = new HashMap<>();
            res.put("error", "User not found.");
            return ResponseEntity.badRequest().body(res);
        }

        try {
            AiCoachResponse response = aiCoachService.getCoachingInsight(user, false);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }

    @PostMapping("/refresh/{userId}")
    public ResponseEntity<?> forceRefreshInsight(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            Map<String, String> res = new HashMap<>();
            res.put("error", "User not found.");
            return ResponseEntity.badRequest().body(res);
        }

        try {
            AiCoachResponse response = aiCoachService.getCoachingInsight(user, true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }
}
