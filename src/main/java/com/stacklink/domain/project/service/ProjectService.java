package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.ProjectCreateRequest;
import com.stacklink.domain.project.dto.ProjectResponse;
import com.stacklink.domain.project.dto.ProjectUpdateRequest;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.enums.ApplicationStatus;
import com.stacklink.domain.project.entity.TechProjects;
import com.stacklink.domain.project.repository.ProjectApplyRepository;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.TechProjectsRepository;
import com.stacklink.domain.project.repository.TechRepository;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectApplyRepository projectApplyRepository;
    private final TechProjectsRepository techProjectsRepository;
    private final TechRepository techRepository;

    // 생성
    public Long createProject(
            Long userId,
            ProjectCreateRequest request
    ) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("유저 없음"));

        Project project = Project.builder()
                .author(user)
                .projectName(request.getProjectname())
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

        Project saved = projectRepository.save(project);

        if (request.getTechNames() != null) {
            request.getTechNames().forEach(techName ->
                techRepository.findByTechName(techName).ifPresent(tech ->
                    techProjectsRepository.save(new TechProjects(tech, saved))
                )
            );
        }

        return saved.getId();
    }

    // 단건 조회
    public ProjectResponse getProject(Long projectId) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setViewCount(project.getViewCount() + 1);

        List<String> tags = techProjectsRepository.findByProject_Id(project.getId())
                .stream()
                .map(tp -> tp.getTech().getTechName())
                .toList();

        long applyCount = projectApplyRepository.countByIdProjectIdAndStatusNot(project.getId(), ApplicationStatus.REJECTED);

        return ProjectResponse.builder()
                .id(project.getId())
                .userId(project.getAuthor().getId())
                .authorName(project.getAuthor().getNickname())
                .projectname(project.getProjectName())
                .content(project.getContent())
                .recruitCount(project.getRecruitCount())
                .isClosed(project.isClosed())
                .viewCount(project.getViewCount())
                .favoriteCount(project.getFavoriteCount())
                .deadlineAt(project.getDeadlineAt())
                .createdAt(project.getCreatedAt())
                .tags(tags)
                .applyCount(applyCount)
                .build();
    }

    // 전체 조회
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjects() {

        return projectRepository.findByIsDeletedFalse()
                .stream()
                .map(p -> {
                    List<String> tags = techProjectsRepository.findByProject_Id(p.getId())
                            .stream()
                            .map(tp -> tp.getTech().getTechName())
                            .toList();
                    return ProjectResponse.builder()
                            .id(p.getId())
                            .userId(p.getAuthor().getId())
                            .authorName(p.getAuthor().getNickname())
                            .projectname(p.getProjectName())
                            .content(p.getContent())
                            .recruitCount(p.getRecruitCount())
                            .isClosed(p.isClosed())
                            .viewCount(p.getViewCount())
                            .favoriteCount(p.getFavoriteCount())
                            .deadlineAt(p.getDeadlineAt())
                            .createdAt(p.getCreatedAt())
                            .tags(tags)
                            .build();
                })
                .toList();
    }

    // 수정
    public void updateProject(
            Long projectId,
            ProjectUpdateRequest request
    ) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setProjectName(request.getProjectname());
        project.setContent(request.getContent());
        project.setRecruitCount(request.getRecruitCount());
        project.setDeadlineAt(request.getDeadlineAt());
        project.setUpdatedAt(LocalDateTime.now());

        if (request.getTechNames() != null) {
            techProjectsRepository.deleteByProject_Id(projectId);
            request.getTechNames().forEach(techName ->
                techRepository.findByTechName(techName).ifPresent(tech ->
                    techProjectsRepository.save(new TechProjects(tech, project))
                )
            );
        }
    }

    // 공고 마감
    public void closeProject(Long projectId) {
        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));
        project.setClosed(true);
        project.setUpdatedAt(LocalDateTime.now());
    }

    // 삭제
    public void deleteProject(Long projectId) {

        Project project = projectRepository
                .findByIdAndIsDeletedFalse(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        project.setDeleted(true);
        project.setUpdatedAt(LocalDateTime.now());
    }

    // 내가 올린 공고 목록
    @Transactional(readOnly = true)
    public List<ProjectResponse> getMyProjects(Long userId) {
        return projectRepository.findByAuthor_IdAndIsDeletedFalse(userId)
                .stream()
                .map(p -> ProjectResponse.builder()
                        .id(p.getId())
                        .userId(p.getAuthor().getId())
                        .projectname(p.getProjectName())
                        .content(p.getContent())
                        .recruitCount(p.getRecruitCount())
                        .isClosed(p.isClosed())
                        .viewCount(p.getViewCount())
                        .favoriteCount(p.getFavoriteCount())
                        .deadlineAt(p.getDeadlineAt())
                        .build())
                .toList();
    }

    // 공개 통계
    @Transactional(readOnly = true)
    public Map<String, Object> getStats() {
        long total = projectApplyRepository.count();
        long accepted = projectApplyRepository.countByStatus(ApplicationStatus.ACCEPTED);
        long matchRate = total == 0 ? 0 : Math.round((double) accepted / total * 100);

        return Map.of(
                "total",     projectRepository.countByIsDeleted(false),
                "active",    projectRepository.countByIsClosed(false),
                "applicants", total,
                "matchRate", matchRate
        );
    }

    // 핫한 공고 Top 5
    @Transactional(readOnly = true)
    public List<ProjectResponse> getHotProjects(){
        return projectRepository.findHotProjects(PageRequest.of(0,5))
                .getContent()
                .stream()
                .map(ProjectResponse::from)
                .toList();
    }
}