package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectFavorite;
import com.stacklink.domain.project.entity.ProjectFavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProjectFavoriteRepository extends JpaRepository<ProjectFavorite, ProjectFavoriteId> {
    long countByIdProjectId(Long projectId);

    List<ProjectFavorite> findByUser_Id(Long userId);
}