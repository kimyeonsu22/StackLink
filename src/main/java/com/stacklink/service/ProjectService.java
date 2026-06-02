package com.stacklink.service;

import com.stacklink.dto.ProjectCreateRequest;
import com.stacklink.dto.ProjectResponse;
import com.stacklink.dto.ProjectUpdateRequest;
import com.stacklink.entity.Project;
import com.stacklink.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    // 생성
    public Long createProject(
            Long userId,
            ProjectCreateRequest request
    ) {

        Project project = Project.builder()
                .userId(userId)
                .projectname(request.getProjectname())
                .title(request.getTitle())
                .content(request.getContent())
                .recruitCount(request.getRecruitCount())
                .deadlineAt(request.getDeadlineAt())
                .isClosed(false)
                .viewCount(0)
                .favoriteCount(0)
                .isDeleted(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return projectRepository.save(project).getId();
    }

    // 단건 조회
    public ProjectResponse getProject(Long projectId) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setViewCount(project.getViewCount() + 1);

        return ProjectResponse.builder()
                .id(project.getId())
                .userId(project.getUserId())
                .projectname(project.getProjectname())
                .title(project.getTitle())
                .content(project.getContent())
                .recruitCount(project.getRecruitCount())
                .isClosed(project.getIsClosed())
                .viewCount(project.getViewCount())
                .favoriteCount(project.getFavoriteCount())
                .deadlineAt(project.getDeadlineAt())
                .build();
    }

    // 전체 조회
    @Transactional(readOnly = true)
    public List<Project> getProjects() {

        return projectRepository.findByIsDeletedFalse();
    }

    // 수정
    public void updateProject(
            Long projectId,
            ProjectUpdateRequest request
    ) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setProjectname(request.getProjectname());
        project.setTitle(request.getTitle());
        project.setContent(request.getContent());
        project.setRecruitCount(request.getRecruitCount());
        project.setDeadlineAt(request.getDeadlineAt());
        project.setUpdatedAt(LocalDateTime.now());
    }

    // 삭제
    public void deleteProject(Long projectId) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setIsDeleted(true);
        project.setUpdatedAt(LocalDateTime.now());
    }
}