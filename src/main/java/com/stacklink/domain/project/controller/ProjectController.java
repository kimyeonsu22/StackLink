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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public Long create(
            Authentication authentication,
            @RequestBody ProjectCreateRequest request
    ) {
        Long userId = Long.valueOf(authentication.getName());
        return projectService.createProject(userId, request);
    }

    @GetMapping
    public List<ProjectResponse> getProjects() {
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

    // 프로젝트 마감
    @PatchMapping("/{projectId}/close")
    public ResponseEntity<String> close(Authentication authentication, @PathVariable Long projectId) {
        Long userId = Long.valueOf(authentication.getName());
        try {
            projectService.closeProject(userId, projectId);
            return ResponseEntity.ok("공고가 마감되었습니다.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
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

    // 공개 통계 (전체 공고수, 모집중, 지원자 수, 매칭률)
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return projectService.getStats();
    }
}