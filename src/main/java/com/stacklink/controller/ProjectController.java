package com.stacklink.controller;

import com.stacklink.dto.ProjectCreateRequest;
import com.stacklink.dto.ProjectResponse;
import com.stacklink.dto.ProjectUpdateRequest;
import com.stacklink.entity.Project;
import com.stacklink.service.ProjectService;
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
}