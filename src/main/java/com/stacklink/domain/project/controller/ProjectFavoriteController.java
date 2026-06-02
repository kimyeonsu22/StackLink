package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.service.ProjectFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorites")
public class ProjectFavoriteController {
    private final ProjectFavoriteService projectFavoriteService;

    // 좋아요 버튼 1회 클릭 -> 좋아요 -> 1번 더 클릭 -> 좋아요 취소 (토글버튼)
    @PostMapping("/{projectId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long projectId){
        Long userId = 1L;

        boolean liked = projectFavoriteService.toggleFavorite(userId, projectId);

        return ResponseEntity.ok(Map.of("liked", liked));
    }

    // 마이페이지에서 내가 좋아요한 공고 리스트 출력
    @GetMapping("/mypage/favorite")
    public ResponseEntity<?> getFavorites(){
        Long userId = 1L;

        return ResponseEntity.ok(projectFavoriteService.getFavorite(userId));
    }

}
