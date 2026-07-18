package com.momentum.service;

import com.momentum.dto.AiCoachResponse;
import com.momentum.dto.AnalyticsSnapshot;
import com.momentum.model.User;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class LocalCoachService {

    private final Random random = new Random();

    public AiCoachResponse generateDailyInsight(User user, AnalyticsSnapshot stats, String pattern) {
        AiCoachResponse response = new AiCoachResponse();
        
        // Base setup
        response.setGreeting("Good " + getTimeOfDay() + ", " + (user.getUsername() != null ? user.getUsername() : "Builder") + " 👋");
        response.setPattern(pattern);
        
        int streak = stats.getCurrentStreak();
        int rate = stats.getCompletionRate();
        
        // State Machine
        if (streak == 0 && stats.getActiveDays() > 3) {
            buildRecoveringState(response, stats);
        } else if (stats.getActiveDays() <= 5) {
            buildBeginnerState(response, stats);
        } else if (streak >= 7 || rate >= 80) {
            buildMasterState(response, stats);
        } else {
            buildConsistentState(response, stats);
        }

        // Shared Logic
        response.setNextMilestone(((stats.getLongestStreak() / 5) + 1) * 5);
        response.setProgressPercent(Math.min(100, (streak * 100) / response.getNextMilestone()));
        response.setCelebration(streak > 0 && streak % 5 == 0);
        response.setGrowthSummary("Your longest streak is " + stats.getLongestStreak() + " days. " + (stats.getWeeklyTrend().equals("improving") ? "You are on an upward trend!" : ""));

        return response;
    }

    private void buildRecoveringState(AiCoachResponse response, AnalyticsSnapshot stats) {
        response.setMood("recovering");
        response.setCoachTitle("Momentum Rebuilder");
        response.setObservation("You've missed a few days, but that's a normal part of building habits.");
        response.setMotivation("Don't stress about a broken streak. Every master was once a beginner.");
        response.setChallenge("Complete just ONE habit today to get the momentum back.");
        response.setSuggestedHabit("Try a 2-minute breathing exercise to reset.");
    }

    private void buildBeginnerState(AiCoachResponse response, AnalyticsSnapshot stats) {
        response.setMood("encouraging");
        response.setCoachTitle("Habit Novice");
        response.setObservation("You've been active for " + stats.getActiveDays() + " days. Great start!");
        response.setMotivation("Small steps today lead to massive changes tomorrow.");
        response.setChallenge("Check off your easiest habit first to build immediate momentum.");
        response.setSuggestedHabit("Drink a glass of water right now.");
    }

    private void buildConsistentState(AiCoachResponse response, AnalyticsSnapshot stats) {
        response.setMood("focused");
        response.setCoachTitle("Momentum Builder");
        response.setObservation("You have a completion rate of " + stats.getCompletionRate() + "%. Solid work!");
        response.setMotivation("Consistency compounds. You are building a powerful routine.");
        response.setChallenge("Try completing a habit in your weakest category (" + stats.getWeakestHabitCategory() + ").");
        response.setSuggestedHabit("Add a 5-minute planning session to your evening.");
    }

    private void buildMasterState(AiCoachResponse response, AnalyticsSnapshot stats) {
        response.setMood("celebratory");
        response.setCoachTitle("Consistency Master");
        response.setObservation("You are on a " + stats.getCurrentStreak() + "-day streak! Exceptional dedication.");
        response.setMotivation("You've unlocked a new level of self-discipline. Keep soaring!");
        response.setChallenge("Complete all your habits today to protect your elite streak.");
        response.setSuggestedHabit("Consider raising the difficulty of your strongest habit.");
    }

    private String getTimeOfDay() {
        int hour = java.time.LocalTime.now().getHour();
        if (hour < 12) return "morning";
        if (hour < 18) return "afternoon";
        return "evening";
    }
}
