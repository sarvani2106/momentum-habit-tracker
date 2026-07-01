package com.momentum.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "habit_records")
public class HabitRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FORCING Hibernate and Jackson to recognize this exact column and JSON key
    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    private int currentStreak = 0;
    private int longestStreak = 0;
    
    @Column(name = "category")
    @JsonProperty("category")
    private String category = "Custom";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // --- GETTERS AND SETTERS (CRITICAL FOR JSON) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }
    
    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}