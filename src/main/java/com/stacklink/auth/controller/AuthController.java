package com.stacklink.auth.controller;

import com.stacklink.auth.dto.LoginRequest;
import com.stacklink.auth.dto.SignupRequest;
import com.stacklink.auth.dto.TokenResponse;
import com.stacklink.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 자체 회원가입 API
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok().build();
    }

    // AuthController
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(authService.isEmailAvailable(email));  // true=사용가능
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(authService.isNicknameAvailable(nickname));
    }

    /**
     * 자체 로그인 API (JWT 반환)
     */
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // AuthController
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // (추후 RefreshToken 저장소 도입 시 여기서 폐기 처리)
        return ResponseEntity.ok().build();
    }
}