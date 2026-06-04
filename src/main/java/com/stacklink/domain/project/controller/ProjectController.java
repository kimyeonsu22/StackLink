package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.ProjectCreateRequest;
import com.stacklink.domain.project.dto.ProjectResponse;
import com.stacklink.domain.project.dto.ProjectUpdateRequest;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
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

    // 핫한 공고 Top 5 (좋아요 * 2 + 지원자 수 * 5로 도출)
    @GetMapping("/top5")
    public List<ProjectResponse> getTop5Projects() {
        return projectService.getHotProjects();
    }

    // 통계 (전체 공고수, 모집중, 지원자 수, 매칭률)


}