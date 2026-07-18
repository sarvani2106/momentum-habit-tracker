package com.momentum.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.model.HabitLog;
import com.momentum.repository.HabitLogRepository;

@RestController
@RequestMapping("/api/habit-logs")
@CrossOrigin(origins = "http://localhost:5173")
public class HabitLogController {

    @Autowired
    private HabitLogRepository habitLogRepository;

    @GetMapping("/activity/{userId}")
    public ResponseEntity<?> getUserActivity(@PathVariable Long userId) {
        List<HabitLog> logs = habitLogRepository.findByUserId(userId);
        
        // Group by LocalDate and count
        Map<LocalDate, Long> counts = logs.stream().collect(Collectors.groupingBy(
            log -> log.getTimestamp().toLocalDate(),
            Collectors.counting()
        ));
        
        // Format as expected by frontend: [{ date: '2023-10-01', count: 3 }]
        List<Map<String, Object>> response = new ArrayList<>();
        counts.forEach((date, count) -> {
            Map<String, Object> map = new HashMap<>();
            map.put("date", date.toString()); // LocalDate.toString() is "YYYY-MM-DD"
            map.put("count", count);
            response.add(map);
        });
        
        return ResponseEntity.ok(response);
    }
}
