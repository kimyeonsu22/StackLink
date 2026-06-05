package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.service.ProjectFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorites")
public class ProjectFavoriteController {
    private final ProjectFavoriteService projectFavoriteService;

    // 좋아요 버튼 1회 클릭 -> 좋아요 -> 1번 더 클릭 -> 좋아요 취소 (토글버튼)
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @PostMapping("/{projectId}")
    public ResponseEntity<?> toggleFavorite(Authentication authentication, @PathVariable Long projectId){
        Long userId = Long.valueOf(authentication.getName());

        boolean liked = projectFavoriteService.toggleFavorite(projectId, userId);

        return ResponseEntity.ok(Map.of("liked", liked));
    }

    // 마이페이지에서 내가 좋아요한 공고 리스트 출력
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @GetMapping("/mypage/favorite")
    public ResponseEntity<?> getFavorites(Authentication authentication){
        Long userId = Long.valueOf(authentication.getName());

        return ResponseEntity.ok(projectFavoriteService.getFavorite(userId));
    }

}
