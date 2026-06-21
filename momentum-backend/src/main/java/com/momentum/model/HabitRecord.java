package com.momentum.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "habit_records")
public class HabitRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This links the record to a specific habit
    @Column(name = "habit_id", nullable = false)
    private Long habitId;

    // The exact day it was completed
    @Column(name = "completed_date", nullable = false)
    private LocalDate completedDate;

    // Magic: Automatically grab today's date if one isn't provided
    @PrePersist
    protected void onCreate() {
        if (this.completedDate == null) {
            this.completedDate = LocalDate.now();
        }
    }

    // --- GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getHabitId() { return habitId; }
    public void setHabitId(Long habitId) { this.habitId = habitId; }

    public LocalDate getCompletedDate() { return completedDate; }
    public void setCompletedDate(LocalDate completedDate) { this.completedDate = completedDate; }
}