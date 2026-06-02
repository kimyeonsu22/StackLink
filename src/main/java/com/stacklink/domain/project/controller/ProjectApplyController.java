package com.stacklink.domain.project.controller;

import com.stacklink.dto.ApplyRequest;
import com.stacklink.domain.project.service.ProjectApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
public class ProjectApplyController {
    private final ProjectApplyService projectApplyService;

    @Autowired
    public ProjectApplyController(ProjectApplyService projectApplyService) {
        this.projectApplyService = projectApplyService;
    }

    @PostMapping("/{projectId}/apply")
    public ResponseEntity<String> apply(@PathVariable Long projectId, @RequestBody ApplyRequest req) {
        Long userId = 1L;

        projectApplyService.applyProject(userId, projectId, req);
        return ResponseEntity.ok("지원 완료");
    }
}
