package com.momentum.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.momentum.model.HabitRecord;
import com.momentum.repository.HabitRecordRepository;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "*") // The VIP Badge for the browser!
public class HabitRecordController {

    private final HabitRecordRepository habitRecordRepository;

    public HabitRecordController(HabitRecordRepository habitRecordRepository) {
        this.habitRecordRepository = habitRecordRepository;
    }

    // 1. GET ALL RECORDS FOR A SPECIFIC HABIT
    @GetMapping("/habit/{habitId}")
    public List<HabitRecord> getRecordsForHabit(@PathVariable Long habitId) {
        return habitRecordRepository.findByHabitId(habitId);
    }

    // 2. CHECK OFF A HABIT FOR TODAY
    @PostMapping
    public ResponseEntity<HabitRecord> checkOffHabit(@RequestBody HabitRecord record) {
        HabitRecord savedRecord = habitRecordRepository.save(record);
        return ResponseEntity.ok(savedRecord);
    }
}