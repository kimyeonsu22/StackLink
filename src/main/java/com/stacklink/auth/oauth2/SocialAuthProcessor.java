package com.stacklink.auth.oauth2;

import com.stacklink.domain.project.entity.*;
import com.stacklink.domain.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * 소셜 로그인 시 회원 조회/생성/연동을 담당.
 * 외부 HTTP 호출(super.loadUser)과 분리해, DB 작업만 트랜잭션으로 묶는다.
 */
@Service
@RequiredArgsConstructor
public class SocialAuthProcessor {

    private final UserRepository userRepository;
    private final SocialRepository socialRepository;

    /**
     * 소셜 사용자 해석 우선순위
     * 1) 이미 연동된 소셜 계정 → 그 회원 반환
     * 2) 같은 이메일의 기존 회원 존재(이메일 있을 때) → 소셜 연동만 추가
     * 3) 둘 다 없으면 신규 회원 + 소셜 연동 생성
     */
    @Transactional
    public User getOrCreate(String platform, OAuth2UserInfo info) {
        Optional<Social> linked =
                socialRepository.findByPlatformAndPlatformId(platform, info.getProviderId());
        if (linked.isPresent()) {
            return linked.get().getUser();
        }

        if (info.getEmail() != null) {
            Optional<User> byEmail = userRepository.findByEmail(info.getEmail());
            if (byEmail.isPresent()) {
                User user = byEmail.get();
                linkSocial(user, platform, info);  // 기존 회원에 소셜만 연결
                return user;
            }
        }

        return registerNewSocialUser(platform, info);
    }

    /** 기존 회원에 소셜 연동 정보 추가 */
    private void linkSocial(User user, String platform, OAuth2UserInfo info) {
        Social social = Social.builder()
                .user(user)
                .platform(platform)
                .platformId(info.getProviderId())
                .connectedAt(LocalDateTime.now())
                .build();
        socialRepository.save(social);
    }

    /** 신규 소셜 회원 등록 (기본 권한 APPLICANT) */
    private User registerNewSocialUser(String platform, OAuth2UserInfo info) {
        User newUser = User.builder()
                .username(generateUniqueUsername(platform))  // 짧은 내부 식별용 username
                .password(null)
                .nickname(generateUniqueNickname(info.getName()))
                .email(info.getEmail())     // null 허용
                .phoneNumber(null)          // null 허용, 추가정보 단계에서 보완
                .role(Role.APPLICANT)
                .build();
        userRepository.save(newUser);

        linkSocial(newUser, platform, info);
        return newUser;
    }

    /** username 컬럼(VARCHAR 20) 안에 들어가는 짧은 고유 username 생성 (예: kakao_3f9a1b2c) */
    private String generateUniqueUsername(String platform) {
        String username;
        do {
            username = platform + "_" + UUID.randomUUID().toString().substring(0, 8);
        } while (userRepository.existsByUsername(username));
        return username;
    }

    /** 닉네임 중복 방지 */
    private String generateUniqueNickname(String base) {
        String nickname = (base == null || base.isBlank()) ? "user" : base;
        if (nickname.length() > 14) nickname = nickname.substring(0, 14);
        while (userRepository.existsByNickname(nickname)) {
            nickname = nickname + UUID.randomUUID().toString().substring(0, 5);
            if (nickname.length() > 20) nickname = nickname.substring(0, 20);
        }
        return nickname;
    }
}