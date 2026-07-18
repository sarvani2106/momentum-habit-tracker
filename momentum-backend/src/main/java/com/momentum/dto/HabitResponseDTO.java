package com.momentum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.momentum.model.HabitRecord;

public class HabitResponseDTO {
    @JsonProperty("id")
    private Long id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("category")
    private String category;
    
    @JsonProperty("currentStreak")
    private int currentStreak;
    
    @JsonProperty("longestStreak")
    private int longestStreak;
    
    @JsonProperty("completedToday")
    private boolean completedToday;

    public HabitResponseDTO(HabitRecord habit, boolean completedToday) {
        this.id = habit.getId();
        this.name = habit.getName();
        this.category = habit.getCategory();
        this.currentStreak = habit.getCurrentStreak();
        this.longestStreak = habit.getLongestStreak();
        this.completedToday = completedToday;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public int getCurrentStreak() { return currentStreak; }
    public int getLongestStreak() { return longestStreak; }
    public boolean isCompletedToday() { return completedToday; }
}
