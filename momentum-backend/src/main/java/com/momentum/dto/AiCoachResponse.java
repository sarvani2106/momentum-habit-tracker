package com.momentum.dto;

public class AiCoachResponse {
    private String greeting;
    private String observation;
    private String motivation;
    private String challenge;
    private String suggestedHabit;
    private String pattern;
    private String mood;
    private String coachTitle;
    private int nextMilestone;
    private int progressPercent;
    private String nextAchievement;
    private int achievementProgress;
    private boolean celebration;
    private String growthSummary;

    public AiCoachResponse() {}

    public String getGreeting() { return greeting; }
    public void setGreeting(String greeting) { this.greeting = greeting; }

    public String getObservation() { return observation; }
    public void setObservation(String observation) { this.observation = observation; }

    public String getMotivation() { return motivation; }
    public void setMotivation(String motivation) { this.motivation = motivation; }

    public String getChallenge() { return challenge; }
    public void setChallenge(String challenge) { this.challenge = challenge; }

    public String getSuggestedHabit() { return suggestedHabit; }
    public void setSuggestedHabit(String suggestedHabit) { this.suggestedHabit = suggestedHabit; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getCoachTitle() { return coachTitle; }
    public void setCoachTitle(String coachTitle) { this.coachTitle = coachTitle; }

    public int getNextMilestone() { return nextMilestone; }
    public void setNextMilestone(int nextMilestone) { this.nextMilestone = nextMilestone; }

    public int getProgressPercent() { return progressPercent; }
    public void setProgressPercent(int progressPercent) { this.progressPercent = progressPercent; }

    public String getNextAchievement() { return nextAchievement; }
    public void setNextAchievement(String nextAchievement) { this.nextAchievement = nextAchievement; }

    public int getAchievementProgress() { return achievementProgress; }
    public void setAchievementProgress(int achievementProgress) { this.achievementProgress = achievementProgress; }

    public boolean isCelebration() { return celebration; }
    public void setCelebration(boolean celebration) { this.celebration = celebration; }

    public String getGrowthSummary() { return growthSummary; }
    public void setGrowthSummary(String growthSummary) { this.growthSummary = growthSummary; }
}
