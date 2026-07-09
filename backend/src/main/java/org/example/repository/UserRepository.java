package org.example.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.example.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}