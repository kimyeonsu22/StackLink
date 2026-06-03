package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.AdminProjectResponse;
import com.stacklink.domain.project.dto.ApiResponse;
import com.stacklink.domain.project.dto.PageResponse;
import com.stacklink.domain.project.service.AdminProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/projects")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminProjectApiController {

    private final AdminProjectService adminProjectService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AdminProjectResponse>>> getProjects(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "") String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.ok(
                adminProjectService.getProjects(keyword, filter, page, size)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok(adminProjectService.getStats()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        adminProjectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("공고를 삭제했습니다.", null));
    }
}