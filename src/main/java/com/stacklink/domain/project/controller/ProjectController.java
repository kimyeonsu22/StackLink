package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.ProjectCreateRequest;
import com.stacklink.domain.project.dto.ProjectResponse;
import com.stacklink.domain.project.dto.ProjectUpdateRequest;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public Long create(
            @RequestParam Long userId,
            @RequestBody ProjectCreateRequest request
    ) {
        return projectService.createProject(userId, request);
    }

    @GetMapping
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{projectId}")
    public ProjectResponse get(
            @PathVariable Long projectId
    ) {
        return projectService.getProject(projectId);
    }

    @PutMapping("/{projectId}")
    public void update(
            @PathVariable Long projectId,
            @RequestBody ProjectUpdateRequest request
    ) {
        projectService.updateProject(projectId, request);
    }

    @DeleteMapping("/{projectId}")
    public void delete(
            @PathVariable Long projectId
    ) {
        projectService.deleteProject(projectId);
    }

    // 내가 올린 공고 목록
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @GetMapping("/my")
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(projectService.getMyProjects(userId));
    }

    // 핫한 공고 Top 5 (좋아요 * 2 + 지원자 수 * 5로 도출)
    @GetMapping("/top5")
    public List<ProjectResponse> getTop5Projects() {
        return projectService.getHotProjects();
    }

}