package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.AiMatchingResponse;
import com.stacklink.domain.project.service.AiMatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AiMatchingController {

    private final AiMatchingService aiMatchingService;

    // 구독 여부 확인
    @GetMapping("/subscription/{userId}")
    public ResponseEntity<Map<String, Boolean>> checkSubscription(
            @PathVariable Long userId
    ) {
        boolean isSubscribed = aiMatchingService.isSubscribed(userId);
        return ResponseEntity.ok(Map.of("isSubscribed", isSubscribed));
    }

    // AI 매칭 추천 (구독자만 접근 가능)
    @GetMapping("/matching/{userId}")
    public ResponseEntity<List<AiMatchingResponse>> getMatching(
            @PathVariable Long userId,
            @RequestParam String techStack
    ) {
        if (!aiMatchingService.isSubscribed(userId)) {
            return ResponseEntity.status(403).build();
        }
        List<AiMatchingResponse> result = aiMatchingService.getAiMatching(userId, techStack);
        return ResponseEntity.ok(result);
    }
}