package com.momentum.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.momentum.model.Achievement;
import com.momentum.model.User;
import com.momentum.repository.AchievementRepository;
import com.momentum.repository.UserRepository;

@Component
public class DataSeeder {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void seedData() {
        if (userRepository.count() == 0) {
            User u = new User();
            u.setUsername("Builder");
            u.setEmail("builder@example.com");
            u.setPassword(passwordEncoder.encode("password123")); // Default password
            u.setXp(150); // Give them some starter XP
            userRepository.save(u);
            System.out.println("Default User created with password 'password123'.");
        } else {
            // Fix existing passwords that were saved in plain text before Spring Security was added, or are NULL
            for (User u : userRepository.findAll()) {
                if (u.getPassword() == null || !u.getPassword().startsWith("$2a$")) {
                    String plainPassword = (u.getPassword() == null) ? "password123" : u.getPassword();
                    u.setPassword(passwordEncoder.encode(plainPassword));
                    userRepository.save(u);
                    System.out.println("Updated password to BCrypt hash for user: " + u.getUsername());
                }
            }
        }

        if (achievementRepository.count() == 0) {
            createAchievement("3-Day Starter", "Hit a 3-day streak on any habit.", "🌱", 3);
            createAchievement("7-Day Warrior", "Hit a 7-day streak on any habit.", "🔥", 7);
            createAchievement("30-Day Legend", "Hit a 30-day streak on any habit.", "👑", 30);
            System.out.println("Default achievements seeded into database.");
        }
    }

    private void createAchievement(String name, String description, String icon, int requiredStreak) {
        Achievement a = new Achievement();
        a.setName(name);
        a.setDescription(description);
        a.setIcon(icon);
        a.setRequiredStreak(requiredStreak);
        achievementRepository.save(a);
    }
}
