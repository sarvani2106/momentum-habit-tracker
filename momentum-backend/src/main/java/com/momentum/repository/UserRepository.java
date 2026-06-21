package com.momentum.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.momentum.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    
    // Spring Magic: Just by naming this method correctly, Spring knows to write
    // a SQL query like: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);

    // SQL equivalent: SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);
    
    // Checks if a username already exists during registration
    boolean existsByUsername(String username);
    
    // Checks if an email already exists during registration
    boolean existsByEmail(String email);
}