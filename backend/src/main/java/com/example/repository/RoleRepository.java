package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Role;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    // Matches the 'name' field in your Role entity
    Optional<Role> findByName(String name);

    // Matches the 'name' field in your Role entity
    boolean existsByName(String name);
}