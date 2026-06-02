package com.stacklink.repository;

import com.stacklink.entity.ProjectApply;
import com.stacklink.entity.ProjectApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectApplyRepository extends JpaRepository<ProjectApply,Long> {
    boolean existsById(ProjectApplyId projectApplyId);
}
