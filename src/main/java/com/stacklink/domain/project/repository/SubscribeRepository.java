package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    Optional<Subscribe> findBySubName(String subName);
}