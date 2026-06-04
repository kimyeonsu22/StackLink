package com.stacklink.domain.project.controller;

import com.stacklink.auth.oauth2.PrincipalDetails;
import com.stacklink.domain.project.dto.ApplyRequest;
import com.stacklink.domain.project.dto.ProjectApplyResponse;
import com.stacklink.domain.project.service.ProjectApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @PostMapping("/{projectId}/apply")
    public ResponseEntity<String> apply(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                        @PathVariable Long projectId,
                                        @RequestBody ApplyRequest req) {
        Long userId = principalDetails.getUser().getId();

        try{
            projectApplyService.applyProject(userId, projectId, req);
            return ResponseEntity.ok("지원 완료");
        } catch (IllegalStateException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // 공고 지원 취소
    @DeleteMapping("/{projectId}/apply")
    public ResponseEntity<String> cancelApply(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                              @PathVariable Long projectId) {
        Long userId = principalDetails.getUser().getId();

        try{
            projectApplyService.cancelApply(userId, projectId);
            return ResponseEntity.ok("지원 취소 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 공고 지원자 목록 조회
    @GetMapping("/{projectId}/applications")
    public ResponseEntity<List<ProjectApplyResponse>> getApplicants(@PathVariable Long projectId){
        return ResponseEntity.ok(projectApplyService.getApplicants(projectId));
    }

    // 지원자 선택
    @PostMapping("/{projectId}/members/{userId}")
    public ResponseEntity<String> acceptApplicant(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long projectId, @PathVariable Long userId) {
        Long loginUserId = principalDetails.getUser().getId();

        projectApplyService.acceptApplicant(loginUserId, projectId, userId);

        return ResponseEntity.ok("지원자를 팀원으로 등록했습니다.");
    }
}
