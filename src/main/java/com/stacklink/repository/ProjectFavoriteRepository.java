package com.stacklink.repository;

import com.stacklink.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectFavoriteRepository extends JpaRepository<ProjectFavorite, ProjectFavoriteId> {
    long countByIdProjectId(Long projectId);
}