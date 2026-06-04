package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.ApplyRequest;
import com.stacklink.domain.project.dto.MyApplyResponse;
import com.stacklink.domain.project.dto.ProjectApplyResponse;
import com.stacklink.domain.project.service.ProjectApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectApplyController {
    private final ProjectApplyService projectApplyService;

    @Autowired
    public ProjectApplyController(ProjectApplyService projectApplyService) {
        this.projectApplyService = projectApplyService;
    }

    // 공고 지원
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @PostMapping("/{projectId}/apply")
    public ResponseEntity<String> apply(Authentication authentication,
                                        @PathVariable Long projectId,
                                        @RequestBody ApplyRequest req) {
        Long userId = Long.valueOf(authentication.getName());

        try{
            projectApplyService.applyProject(userId, projectId, req);
            return ResponseEntity.ok("지원 완료");
        } catch (IllegalStateException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // 내가 지원한 공고 목록
    @GetMapping("/my-applies")
    public ResponseEntity<List<MyApplyResponse>> getMyApplies(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(projectApplyService.getMyApplies(userId));
    }

    // 공고 지원자 목록 조회
    @GetMapping("/{projectId}/applications")
    public ResponseEntity<List<ProjectApplyResponse>> getApplicants(@PathVariable Long projectId){
        return ResponseEntity.ok(projectApplyService.getApplicants(projectId));
    }

    // 지원자 선택
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @PostMapping("/{projectId}/members/{userId}")
    public ResponseEntity<String> acceptApplicant(Authentication authentication, @PathVariable Long projectId, @PathVariable Long userId) {
        Long loginUserId = Long.valueOf(authentication.getName());

        projectApplyService.acceptApplicant(loginUserId, projectId, userId);

        return ResponseEntity.ok("지원자를 팀원으로 등록했습니다.");
    }
}
