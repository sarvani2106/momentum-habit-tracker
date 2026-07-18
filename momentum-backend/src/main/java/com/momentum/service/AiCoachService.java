package com.momentum.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momentum.dto.AiCoachResponse;
import com.momentum.dto.AnalyticsSnapshot;
import com.momentum.model.DailyInsight;
import com.momentum.model.User;
import com.momentum.repository.DailyInsightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AiCoachService {

    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Autowired
    private DailyInsightRepository dailyInsightRepository;
    
    @Autowired
    private AnalyticsService analyticsService;
    
    @Autowired
    private PatternDetectionService patternDetectionService;
    
    @Autowired
    private LocalCoachService localCoachService;
    
    @Autowired
    private ObjectMapper objectMapper;

    private final Map<Long, Object> userLocks = new ConcurrentHashMap<>();

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    public AiCoachResponse getCoachingInsight(User user, boolean forceRefresh) {
        LocalDate today = LocalDate.now();
        
        Optional<DailyInsight> existing = dailyInsightRepository.findByUserAndDate(user, today);
        
        if (!forceRefresh && existing.isPresent() && existing.get().getInsightJson() != null) {
            try {
                return objectMapper.readValue(existing.get().getInsightJson(), AiCoachResponse.class);
            } catch (Exception e) {
                System.err.println("Failed to parse JSON: " + e.getMessage());
            }
        }
        
        if (forceRefresh && existing.isPresent()) {
            LocalDateTime lastRefresh = existing.get().getLastRefreshedAt();
            if (lastRefresh != null && lastRefresh.isAfter(LocalDateTime.now().minusMinutes(30))) {
                throw new RuntimeException("Cooldown active. Please wait 30 minutes between manual refreshes.");
            }
        }

        Object lock = userLocks.computeIfAbsent(user.getId(), k -> new Object());
        
        synchronized (lock) {
            // Double check
            existing = dailyInsightRepository.findByUserAndDate(user, today);
            if (!forceRefresh && existing.isPresent() && existing.get().getInsightJson() != null) {
                try {
                    return objectMapper.readValue(existing.get().getInsightJson(), AiCoachResponse.class);
                } catch (Exception e) {}
            }

            try {
                AnalyticsSnapshot stats = analyticsService.generateSnapshot(user);
                String pattern = patternDetectionService.detectPattern(stats);
                
                AiCoachResponse responseObj;
                String generatedBy = "LOCAL";
                
                if (forceRefresh) {
                    try {
                        String geminiJson = callGeminiApi(stats, pattern);
                        // Strip markdown formatting if Gemini included it
                        geminiJson = geminiJson.replaceAll("```json", "").replaceAll("```", "").trim();
                        responseObj = objectMapper.readValue(geminiJson, AiCoachResponse.class);
                        generatedBy = "GEMINI";
                    } catch (Exception e) {
                        System.err.println("Gemini failed, falling back to LOCAL: " + e.getMessage());
                        responseObj = localCoachService.generateDailyInsight(user, stats, pattern);
                    }
                } else {
                    responseObj = localCoachService.generateDailyInsight(user, stats, pattern);
                }
                
                String jsonString = objectMapper.writeValueAsString(responseObj);
                String statsString = objectMapper.writeValueAsString(stats);
                
                DailyInsight insightToSave = existing.orElse(new DailyInsight());
                if (!existing.isPresent()) {
                    insightToSave.setUser(user);
                    insightToSave.setDate(today);
                }
                insightToSave.setInsightJson(jsonString);
                insightToSave.setGeneratedBy(generatedBy);
                insightToSave.setAnalyticsSnapshot(statsString);
                if (forceRefresh || insightToSave.getLastRefreshedAt() == null) {
                    insightToSave.setLastRefreshedAt(LocalDateTime.now());
                }
                dailyInsightRepository.save(insightToSave);
                
                return responseObj;
                
            } catch (Exception e) {
                throw new RuntimeException("Failed to generate insight: " + e.getMessage());
            } finally {
                userLocks.remove(user.getId());
            }
        }
    }

    private String callGeminiApi(AnalyticsSnapshot stats, String pattern) throws Exception {
        if (apiKey == null || apiKey.equals("YOUR_API_KEY_HERE") || apiKey.trim().isEmpty()) {
            throw new RuntimeException("API Key missing");
        }

        RestTemplate restTemplate = new RestTemplate();
        
        String prompt = "You are Mo, Momentum's warm, playful, and intelligent habit coach.\n" +
                        "Analyze this user's data and respond ONLY with valid JSON.\n" +
                        "Current Streak: " + stats.getCurrentStreak() + "\n" +
                        "Completion Rate: " + stats.getCompletionRate() + "%\n" +
                        "Active Days: " + stats.getActiveDays() + "\n" +
                        "Strongest Habit: " + stats.getStrongestHabitCategory() + "\n" +
                        "Detected Pattern: " + pattern + "\n\n" +
                        "Generate JSON EXACTLY matching this schema:\n" +
                        "{\n" +
                        "  \"greeting\": \"Time-based greeting (e.g. Good evening, Sarva 👋)\",\n" +
                        "  \"observation\": \"Specific data-driven observation\",\n" +
                        "  \"motivation\": \"Highly encouraging insight\",\n" +
                        "  \"challenge\": \"Specific, actionable goal for today\",\n" +
                        "  \"suggestedHabit\": \"One new habit recommendation\",\n" +
                        "  \"pattern\": \"Detected pattern\",\n" +
                        "  \"mood\": \"encouraging | celebratory | focused | recovering\",\n" +
                        "  \"coachTitle\": \"Habit Novice | Consistency Master | Momentum Builder\",\n" +
                        "  \"nextMilestone\": number (e.g., 10, 50),\n" +
                        "  \"progressPercent\": number (0-100),\n" +
                        "  \"nextAchievement\": \"Name of next milestone\",\n" +
                        "  \"achievementProgress\": number (e.g. 1),\n" +
                        "  \"celebration\": boolean (true if hitting a milestone),\n" +
                        "  \"growthSummary\": \"Historical growth summary\"\n" +
                        "}";

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> parts = new HashMap<>();
        parts.put("text", prompt);
        
        Map<String, Object> contents = new HashMap<>();
        contents.put("parts", List.of(parts));
        
        requestBody.put("contents", List.of(contents));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        String url = GEMINI_API_URL + "?key=" + apiKey;

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
        
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("candidates")) {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (!candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> contentParts = (List<Map<String, Object>>) content.get("parts");
                return (String) contentParts.get(0).get("text");
            }
        }
        
        throw new RuntimeException("Invalid Gemini Response");
    }
}
