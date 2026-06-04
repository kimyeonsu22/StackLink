package com.stacklink.domain.project.controller;

import com.stacklink.auth.oauth2.PrincipalDetails;
import com.stacklink.domain.project.service.ProjectFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorites")
public class ProjectFavoriteController {
    private final ProjectFavoriteService projectFavoriteService;

    // 좋아요 버튼 1회 클릭 -> 좋아요 -> 1번 더 클릭 -> 좋아요 취소 (토글버튼)
    @PostMapping("/{projectId}")
    public ResponseEntity<?> toggleFavorite(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long projectId){
        Long userId = principalDetails.getUser().getId();

        boolean liked = projectFavoriteService.toggleFavorite(userId, projectId);

        return ResponseEntity.ok(Map.of("liked", liked));
    }

    // 마이페이지에서 내가 좋아요한 공고 리스트 출력
    @GetMapping("/mypage/favorite")
    public ResponseEntity<?> getFavorites(@AuthenticationPrincipal PrincipalDetails principalDetails){
        Long userId = principalDetails.getUser().getId();

        return ResponseEntity.ok(projectFavoriteService.getFavorite(userId));
    }

}
