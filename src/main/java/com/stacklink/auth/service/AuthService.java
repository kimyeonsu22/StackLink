package com.stacklink.auth.service;

import com.stacklink.auth.dto.LoginRequest;
import com.stacklink.auth.dto.SignupRequest;
import com.stacklink.auth.dto.TokenResponse;
import com.stacklink.auth.jwt.JwtTokenProvider;
import com.stacklink.domain.project.dto.SubscriptionResponse;
import com.stacklink.domain.project.entity.*;
import com.stacklink.domain.project.repository.CareerRepository;
import com.stacklink.domain.project.repository.TechRepository;
import com.stacklink.domain.project.repository.TechUsersRepository;
import com.stacklink.domain.project.repository.UserRepository;
import com.stacklink.domain.project.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final TechRepository techRepository;
    private final CareerRepository careerRepository;
    private final TechUsersRepository techUsersRepository;

    // 회원 구독상태 확인 및 상태값 조회용
    private final SubscriptionService subscriptionService;

    /**
     * 자체 회원가입 처리
     * - 중복(username/email/nickname) 검증
     * - ADMIN 권한 가입 차단
     * - 비밀번호 암호화 후 저장
     */
    // AuthService.signup — role 기본값 처리, username 중복검사 제거(스키마상 unique 아님)
    @Transactional
    public void signup(SignupRequest req) {
        if (req.getRole() == Role.ADMIN) {
            throw new IllegalArgumentException("관리자 권한으로는 가입할 수 없습니다.");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(req.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        Role role = (req.getRole() != null) ? req.getRole() : Role.APPLICANT;  // 기본 구직회원

        User user = User.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .nickname(req.getNickname())
                .email(req.getEmail())
                .phoneNumber(req.getPhoneNumber())
                .role(role)
                .position(req.getPosition())
                .build();
        userRepository.save(user);

        if (req.getTechStack() != null) {
            req.getTechStack().forEach((techName, careerDetail) -> {
                techRepository.findByTechName(techName).ifPresent(tech -> {
                    Career career = careerRepository.findByCareerDetail(careerDetail).orElse(null);
                    techUsersRepository.save(new TechUsers(user, tech, career));
                });
            });
        }
    }

    @Transactional(readOnly = true)
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    /**
     * 자체 로그인 처리
     * - username 조회 → 비밀번호 검증 → JWT 발급
     */
    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (user.isDeleted()) {
            throw new IllegalArgumentException("탈퇴한 회원입니다.");
        }
        if (user.getPassword() == null
                || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        // 구독 상태확인 -> @ExceptionHandler 보다 앞서 처리
        // 로그인 시 구독 상태까지 함께 확인
        SubscriptionResponse subState = null;
        String accessToken = tokenProvider.createAccessToken(user.getId(), user.getRole().getKey());
        String refreshToken = tokenProvider.createRefreshToken(user.getId());

        try {
            subState = subscriptionService.getSubscription(user.getId());
            return new TokenResponse("Bearer", accessToken, refreshToken, user.getRole().getKey(), user.getNickname(), subState.isSubState());
        }
        catch (RuntimeException e) {
            return new TokenResponse("Bearer", accessToken, refreshToken, user.getRole().getKey(), user.getNickname(), false);
        }
    }
}