package com.momentum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class MomentumBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MomentumBackendApplication.class, args);
	}

	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	@Bean
	public CommandLineRunner runDatabaseMigration(JdbcTemplate jdbcTemplate) {
		return args -> {
			try {
				System.out.println("Running Database Migration for completion_date...");
				jdbcTemplate.execute("DELETE FROM habit_logs WHERE id NOT IN (SELECT min(id) FROM habit_logs GROUP BY habit_record_id, CAST(timestamp AS date))");
				jdbcTemplate.execute("UPDATE habit_logs SET completion_date = CAST(timestamp AS date) WHERE completion_date IS NULL");
				System.out.println("Applying NOT NULL constraint on completion_date...");
				jdbcTemplate.execute("ALTER TABLE habit_logs ALTER COLUMN completion_date SET NOT NULL");
				
				System.out.println("Clearing old cached AI insights...");
				jdbcTemplate.execute("DELETE FROM daily_insights");
				jdbcTemplate.execute("ALTER TABLE daily_insights DROP COLUMN IF EXISTS insight_text CASCADE");
				
				System.out.println("Migration successful.");
			} catch (Exception e) {
				System.err.println("Migration error (might already be applied): " + e.getMessage());
			}
		};
	}

}
