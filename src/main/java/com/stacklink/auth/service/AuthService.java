package com.stacklink.auth.service;

import com.stacklink.auth.dto.*;
import com.stacklink.auth.jwt.JwtTokenProvider;
import com.stacklink.domain.project.entity.*;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    /**
     * 자체 회원가입 처리
     * - 중복(username/email/nickname) 검증
     * - ADMIN 권한 가입 차단
     * - 비밀번호 암호화 후 저장
     */
    @Transactional
    public void signup(SignupRequest req) {
        if (req.getRole() == Role.ADMIN) {
            throw new IllegalArgumentException("관리자 권한으로는 가입할 수 없습니다.");
        }
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(req.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        User user = User.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .nickname(req.getNickname())
                .email(req.getEmail())
                .phoneNumber(req.getPhoneNumber())
                .role(req.getRole())   // APPLICANT 또는 RECRUITER
                .build();
        userRepository.save(user);
    }

    /**
     * 자체 로그인 처리
     * - username 조회 → 비밀번호 검증 → JWT 발급
     */
    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (user.isDeleted()) {
            throw new IllegalArgumentException("탈퇴한 회원입니다.");
        }
        if (user.getPassword() == null
                || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String accessToken = tokenProvider.createAccessToken(user.getId(), user.getRole().getKey());
        String refreshToken = tokenProvider.createRefreshToken(user.getId());
        return new TokenResponse("Bearer", accessToken, refreshToken, user.getRole().getKey());
    }
}