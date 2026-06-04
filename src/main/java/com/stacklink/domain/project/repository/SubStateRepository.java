package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.SubState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubStateRepository extends JpaRepository<SubState, Long> {

    // 회원 ID로 구독 상태 조회
    Optional<SubState> findByUserId(Long userId);
}