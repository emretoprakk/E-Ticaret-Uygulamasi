package com.emretoprak.eticaret.repository;

import com.emretoprak.eticaret.entity.User;
import com.emretoprak.eticaret.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String email);

    User findByRole(UserRole userRole);

    
}
