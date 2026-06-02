package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectApply;
import com.stacklink.domain.project.entity.ProjectApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectApplyRepository extends JpaRepository<ProjectApply,Long> {
    boolean existsById(ProjectApplyId projectApplyId);
}
