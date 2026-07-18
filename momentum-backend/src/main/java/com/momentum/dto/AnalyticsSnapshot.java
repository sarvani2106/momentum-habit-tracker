package com.momentum.dto;

public class AnalyticsSnapshot {
    private int currentStreak;
    private int longestStreak;
    private int completionRate;
    private int activeDays;
    private String bestWeekday;
    private String worstWeekday;
    private String strongestHabitCategory;
    private String weakestHabitCategory;
    private String weeklyTrend;
    private String monthlyTrend;
    private int milestonesAchieved;
    
    public AnalyticsSnapshot() {}

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }

    public int getCompletionRate() { return completionRate; }
    public void setCompletionRate(int completionRate) { this.completionRate = completionRate; }

    public int getActiveDays() { return activeDays; }
    public void setActiveDays(int activeDays) { this.activeDays = activeDays; }

    public String getBestWeekday() { return bestWeekday; }
    public void setBestWeekday(String bestWeekday) { this.bestWeekday = bestWeekday; }

    public String getWorstWeekday() { return worstWeekday; }
    public void setWorstWeekday(String worstWeekday) { this.worstWeekday = worstWeekday; }

    public String getStrongestHabitCategory() { return strongestHabitCategory; }
    public void setStrongestHabitCategory(String strongestHabitCategory) { this.strongestHabitCategory = strongestHabitCategory; }

    public String getWeakestHabitCategory() { return weakestHabitCategory; }
    public void setWeakestHabitCategory(String weakestHabitCategory) { this.weakestHabitCategory = weakestHabitCategory; }

    public String getWeeklyTrend() { return weeklyTrend; }
    public void setWeeklyTrend(String weeklyTrend) { this.weeklyTrend = weeklyTrend; }

    public String getMonthlyTrend() { return monthlyTrend; }
    public void setMonthlyTrend(String monthlyTrend) { this.monthlyTrend = monthlyTrend; }

    public int getMilestonesAchieved() { return milestonesAchieved; }
    public void setMilestonesAchieved(int milestonesAchieved) { this.milestonesAchieved = milestonesAchieved; }
}
