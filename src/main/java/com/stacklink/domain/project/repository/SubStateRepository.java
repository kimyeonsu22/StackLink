package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.SubState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubStateRepository extends JpaRepository<SubState, Long> {

    Optional<SubState> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    boolean existsByUserIdAndSubStateTrue(Long userId);
}