package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectApply;
import com.stacklink.domain.project.entity.ProjectApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectApplyRepository extends JpaRepository<ProjectApply,ProjectApplyId> {
    List<ProjectApply> findByIdProjectId(Long projectId);

    // 마이페이지 내 내가 지원한 공고 보여주기 위해
    List<ProjectApply> findByIdUserId(Long userId);
}
