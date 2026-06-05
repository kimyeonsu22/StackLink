package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.UserResponse;
import com.stacklink.domain.project.dto.UserUpdateRequest;
import com.stacklink.domain.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // 내 프로필 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyProfile(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(userService.getMyProfile(userId));
    }

    // 회원정보 수정
    @PutMapping("/me")
    public ResponseEntity<Void> updateMyProfile(Authentication authentication,
                                                 @RequestBody UserUpdateRequest req) {
        Long userId = Long.valueOf(authentication.getName());
        userService.updateMyProfile(userId, req);
        return ResponseEntity.ok().build();
    }

    // 닉네임 중복 확인
    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Boolean>> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(Map.of("available", userService.isNicknameAvailable(nickname)));
    }

    // 전화번호 중복 확인
    @GetMapping("/check-phone")
    public ResponseEntity<Map<String, Boolean>> checkPhone(@RequestParam String phoneNumber) {
        return ResponseEntity.ok(Map.of("available", userService.isPhoneNumberAvailable(phoneNumber)));
    }
}
