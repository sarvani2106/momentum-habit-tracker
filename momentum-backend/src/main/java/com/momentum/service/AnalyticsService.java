package com.momentum.service;

import com.momentum.dto.AnalyticsSnapshot;
import com.momentum.model.ActivityLog;
import com.momentum.model.HabitLog;
import com.momentum.model.HabitRecord;
import com.momentum.model.User;
import com.momentum.repository.ActivityLogRepository;
import com.momentum.repository.HabitLogRepository;
import com.momentum.repository.HabitRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private HabitRecordRepository habitRecordRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private HabitLogRepository habitLogRepository;

    public AnalyticsSnapshot generateSnapshot(User user) {
        AnalyticsSnapshot snapshot = new AnalyticsSnapshot();
        
        List<HabitRecord> habits = habitRecordRepository.findByUserId(user.getId());
        List<ActivityLog> activities = activityLogRepository.findByUserId(user.getId());
        
        // 1. Streaks
        int highestCurrentStreak = habits.stream().mapToInt(h -> h.getCurrentStreak()).max().orElse(0);
        int highestLongestStreak = habits.stream().mapToInt(h -> h.getLongestStreak()).max().orElse(0);
        snapshot.setCurrentStreak(highestCurrentStreak);
        snapshot.setLongestStreak(highestLongestStreak);
        
        // 2. Active Days
        long activeDays = activities.stream().filter(a -> a.getCompletedCount() > 0).count();
        snapshot.setActiveDays((int) activeDays);
        
        // 3. Completion Rate (Active Days / Total Days since account created)
        // Simplified: use 90 days as denominator for consistency if account is older, or actual days if newer.
        // Let's just use activeDays / Math.max(1, activities.size()) * 100 for a local rate.
        int totalTrackedDays = Math.max(1, activities.size());
        int rate = (int) Math.round(((double) activeDays / totalTrackedDays) * 100);
        snapshot.setCompletionRate(rate);

        // 4. Weekdays Analysis
        Map<Integer, Integer> weekdayCounts = new HashMap<>();
        for (ActivityLog log : activities) {
            if (log.getCompletedCount() > 0) {
                int dayOfWeek = log.getDate().getDayOfWeek().getValue();
                weekdayCounts.put(dayOfWeek, weekdayCounts.getOrDefault(dayOfWeek, 0) + 1);
            }
        }
        
        if (!weekdayCounts.isEmpty()) {
            int bestDay = Collections.max(weekdayCounts.entrySet(), Map.Entry.comparingByValue()).getKey();
            int worstDay = Collections.min(weekdayCounts.entrySet(), Map.Entry.comparingByValue()).getKey();
            snapshot.setBestWeekday(getDayName(bestDay));
            snapshot.setWorstWeekday(getDayName(worstDay));
        } else {
            snapshot.setBestWeekday("None");
            snapshot.setWorstWeekday("None");
        }

        // 5. Strongest/Weakest Habit Category
        Map<String, Integer> categoryStreaks = new HashMap<>();
        for (HabitRecord h : habits) {
            String cat = h.getCategory();
            if (cat == null) cat = "Custom";
            categoryStreaks.put(cat, categoryStreaks.getOrDefault(cat, 0) + h.getLongestStreak());
        }
        
        if (!categoryStreaks.isEmpty()) {
            String bestCat = Collections.max(categoryStreaks.entrySet(), Map.Entry.comparingByValue()).getKey();
            String worstCat = Collections.min(categoryStreaks.entrySet(), Map.Entry.comparingByValue()).getKey();
            snapshot.setStrongestHabitCategory(bestCat);
            snapshot.setWeakestHabitCategory(worstCat);
        } else {
            snapshot.setStrongestHabitCategory("None");
            snapshot.setWeakestHabitCategory("None");
        }

        // 6. Trends (Last 7 days vs Prev 7 days)
        LocalDate today = LocalDate.now();
        long thisWeek = activities.stream().filter(a -> a.getDate().isAfter(today.minusDays(7)) && a.getCompletedCount() > 0).count();
        long lastWeek = activities.stream().filter(a -> a.getDate().isAfter(today.minusDays(14)) && a.getDate().isBefore(today.minusDays(6)) && a.getCompletedCount() > 0).count();
        
        if (thisWeek > lastWeek) snapshot.setWeeklyTrend("improving");
        else if (thisWeek < lastWeek) snapshot.setWeeklyTrend("declining");
        else snapshot.setWeeklyTrend("stable");

        snapshot.setMonthlyTrend("stable"); // Simplified for now
        snapshot.setMilestonesAchieved(highestLongestStreak / 5); // Every 5 days is a milestone

        return snapshot;
    }

    private String getDayName(int dayOfWeek) {
        String[] days = {"", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        return dayOfWeek >= 1 && dayOfWeek <= 7 ? days[dayOfWeek] : "None";
    }
}
