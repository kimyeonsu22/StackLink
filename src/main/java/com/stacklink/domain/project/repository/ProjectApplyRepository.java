package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectApply;
import com.stacklink.domain.project.entity.ProjectApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectApplyRepository extends JpaRepository<ProjectApply,ProjectApplyId> {
    List<ProjectApply> findByProjectId(Long projectId);
}
