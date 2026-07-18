package com.momentum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.momentum.model.Achievement;
import com.momentum.model.HabitRecord;

public class HabitCompletionResponseDTO {
    @JsonProperty("success")
    private boolean success;
    
    @JsonProperty("alreadyCompleted")
    private boolean alreadyCompleted;
    
    @JsonProperty("record")
    private HabitRecord record;
    
    @JsonProperty("xpGained")
    private int xpGained;
    
    @JsonProperty("totalXp")
    private int totalXp;
    
    @JsonProperty("level")
    private int level;
    
    @JsonProperty("leveledUp")
    private boolean leveledUp;
    
    @JsonProperty("unlockedAchievement")
    private Achievement unlockedAchievement;

    // Constructors, Getters, and Setters
    public HabitCompletionResponseDTO() {}

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public boolean isAlreadyCompleted() { return alreadyCompleted; }
    public void setAlreadyCompleted(boolean alreadyCompleted) { this.alreadyCompleted = alreadyCompleted; }

    public HabitRecord getRecord() { return record; }
    public void setRecord(HabitRecord record) { this.record = record; }

    public int getXpGained() { return xpGained; }
    public void setXpGained(int xpGained) { this.xpGained = xpGained; }

    public int getTotalXp() { return totalXp; }
    public void setTotalXp(int totalXp) { this.totalXp = totalXp; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public boolean isLeveledUp() { return leveledUp; }
    public void setLeveledUp(boolean leveledUp) { this.leveledUp = leveledUp; }

    public Achievement getUnlockedAchievement() { return unlockedAchievement; }
    public void setUnlockedAchievement(Achievement unlockedAchievement) { this.unlockedAchievement = unlockedAchievement; }
}
