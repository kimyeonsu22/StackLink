package com.stacklink.repository;

import com.stacklink.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByIsDeletedFalse();

    Optional<Project> findByIdAndIsDeletedFalse(Long id);

    // AI 매칭용으로 추가
    List<Project> findByIsDeletedFalseAndIsClosedFalse();
}