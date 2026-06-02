package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectFavorite;
import com.stacklink.domain.project.entity.ProjectFavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectFavoriteRepository
        extends JpaRepository<ProjectFavorite, ProjectFavoriteId> {
}