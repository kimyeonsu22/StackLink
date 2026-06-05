package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.FollowUserResponse;
import com.stacklink.domain.project.service.UserFollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class UserFollowController {
    private final UserFollowService userFollowService;

    // 팔로우 버튼
    @PostMapping("/{followingId}")
    public ResponseEntity<Boolean> toggleFollow(@PathVariable Long followingId, Authentication authentication) {
        Long followerId = Long.valueOf(authentication.getName());

        // follower, followin 인자 거꾸로 되어 있었어서 수정
        boolean following = userFollowService.toggleFollow(followerId, followingId);

        return ResponseEntity.ok(following);
    }

    // 내가 팔로우하는 사람 목록
    @GetMapping("/{userId}/following")
    public ResponseEntity<List<FollowUserResponse>> getFollowingList (@PathVariable Long userId) {
        return ResponseEntity.ok(userFollowService.getFollowingList(userId));
    }

    // 나를 팔로우하는 사람 목록
    @GetMapping("/{userId}/follower")
    public ResponseEntity<List<FollowUserResponse>> getFollowerList (@PathVariable Long userId) {
        return ResponseEntity.ok(userFollowService.getFollowerList(userId));
    }

}
