package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.AdminUserResponse;
import com.stacklink.domain.project.dto.ApiResponse;
import com.stacklink.domain.project.dto.PageResponse;
import com.stacklink.domain.project.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminUserApiController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AdminUserResponse>>> getUsers(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "") String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.ok(
                adminUserService.getUsers(keyword, filter, page, size)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok(adminUserService.getStats()));
    }

    @PatchMapping("/{id}/ban")
    public ResponseEntity<ApiResponse<Void>> banUser(@PathVariable Long id) {
        adminUserService.banUser(id);
        return ResponseEntity.ok(ApiResponse.ok("회원을 제재했습니다.", null));
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreUser(@PathVariable Long id) {
        adminUserService.restoreUser(id);
        return ResponseEntity.ok(ApiResponse.ok("회원을 복구했습니다.", null));
    }
}