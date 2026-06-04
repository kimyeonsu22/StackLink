package com.stacklink.repository;

import com.stacklink.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 기존 코드 (조원들꺼 그대로)
    List<Project> findByIsDeletedFalse();

    Optional<Project> findByIdAndIsDeletedFalse(Long id);

    // AI 매칭용으로 추가 (한 줄만 추가한 거예요!)
    List<Project> findByIsDeletedFalseAndIsClosedFalse();
}