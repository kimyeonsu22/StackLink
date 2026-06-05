package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.Tech;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechRepository extends JpaRepository<Tech, Long> {
    Optional<Tech> findByTechName(String techName);
}
