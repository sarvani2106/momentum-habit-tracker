package com.momentum.service;

import com.momentum.dto.AnalyticsSnapshot;
import org.springframework.stereotype.Service;

@Service
public class PatternDetectionService {

    public String detectPattern(AnalyticsSnapshot stats) {
        if ("improving".equals(stats.getWeeklyTrend())) {
            return "You are building strong momentum this week. Your consistency improved!";
        }
        
        if ("Saturday".equals(stats.getWorstWeekday()) || "Sunday".equals(stats.getWorstWeekday())) {
            return "You tend to miss habits on weekends. Try setting a smaller weekend goal.";
        }
        
        if ("Monday".equals(stats.getBestWeekday())) {
            return "You always start the week strong on Mondays!";
        }

        if (stats.getStrongestHabitCategory() != null && !stats.getStrongestHabitCategory().equals("None")) {
            return "You are strongest in " + stats.getStrongestHabitCategory() + " habits.";
        }
        
        if (stats.getCurrentStreak() > 0 && stats.getCurrentStreak() % 5 == 0) {
            return "You're consistently hitting 5-day milestones. Keep pushing!";
        }

        if (stats.getActiveDays() < 5) {
            return "You are just getting started. Every small step counts!";
        }

        if ("declining".equals(stats.getWeeklyTrend())) {
            return "Your consistency dipped slightly this week, but you can bounce back today.";
        }

        return "You are actively building your habit profile.";
    }
}
