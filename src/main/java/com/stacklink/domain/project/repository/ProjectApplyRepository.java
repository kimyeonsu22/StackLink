package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectApply;
import com.stacklink.domain.project.entity.ProjectApplyId;
import com.stacklink.domain.project.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectApplyRepository extends JpaRepository<ProjectApply,ProjectApplyId> {
    List<ProjectApply> findByIdProjectId(Long projectId);

    // 마이페이지 내 내가 지원한 공고 보여주기 위해
    List<ProjectApply> findByIdUserId(Long userId);

    long countByIdProjectIdAndStatusNot(Long projectId, ApplicationStatus status);

    // 아래 두 변수 매칭률 계산하기 위함
    // 전체 지원자 수 (거절 제외)
    long countByStatusNot(ApplicationStatus status);

    // 승인된 지원자 수
    long countByStatus(ApplicationStatus status);
}
