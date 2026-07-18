package com.momentum.service;

import com.momentum.model.HabitLog;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StreakService {

    public int calculateCurrentStreak(List<HabitLog> logs) {
        if (logs == null || logs.isEmpty()) {
            return 0;
        }

        List<LocalDate> sortedDates = logs.stream()
                .map(HabitLog::getCompletionDate)
                .distinct()
                .sorted((a, b) -> b.compareTo(a)) // Descending
                .collect(Collectors.toList());

        LocalDate expectedDate = LocalDate.now();
        int streak = 0;

        // Check if the streak broke yesterday. If they didn't complete today or yesterday, streak is 0.
        if (!sortedDates.contains(expectedDate) && !sortedDates.contains(expectedDate.minusDays(1))) {
            return 0;
        }

        // If not completed today, we start counting from yesterday
        if (!sortedDates.contains(expectedDate)) {
            expectedDate = expectedDate.minusDays(1);
        }

        for (LocalDate date : sortedDates) {
            if (date.equals(expectedDate)) {
                streak++;
                expectedDate = expectedDate.minusDays(1);
            } else {
                break;
            }
        }

        return streak;
    }

    public int calculateLongestStreak(List<HabitLog> logs) {
        if (logs == null || logs.isEmpty()) {
            return 0;
        }

        List<LocalDate> sortedDates = logs.stream()
                .map(HabitLog::getCompletionDate)
                .distinct()
                .sorted() // Ascending
                .collect(Collectors.toList());

        int maxStreak = 1;
        int currentStreak = 1;

        for (int i = 1; i < sortedDates.size(); i++) {
            if (sortedDates.get(i).equals(sortedDates.get(i - 1).plusDays(1))) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }

        return maxStreak;
    }
}
