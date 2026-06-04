package com.stacklink.auth.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    // 스프링 없이 직접 생성 (시크릿은 32자 이상)
    private final JwtTokenProvider provider = new JwtTokenProvider(
            "test-secret-key-that-is-at-least-32-characters-long",
            1800000L,      // access 30분
            1209600000L);  // refresh 14일

    @Test
    void 액세스토큰_생성_검증_권한추출() {
        String token = provider.createAccessToken(1L, "ROLE_APPLICANT");

        assertThat(provider.validateToken(token)).isTrue();
        assertThat(provider.isAccessToken(token)).isTrue();   // access 타입 확인
        assertThat(provider.getUserId(token)).isEqualTo(1L);

        Authentication auth = provider.getAuthentication(token);
        assertThat(auth.getName()).isEqualTo("1");
        assertThat(auth.getAuthorities())
                .extracting("authority")
                .contains("ROLE_APPLICANT");
    }

    @Test
    void 리프레시토큰은_액세스타입이_아님() {
        String refresh = provider.createRefreshToken(1L);

        assertThat(provider.validateToken(refresh)).isTrue();
        assertThat(provider.isAccessToken(refresh)).isFalse();  // 핵심: 인증에 못 쓰게 막은 부분
    }

    @Test
    void 잘못된_토큰은_검증실패() {
        assertThat(provider.validateToken("이건.가짜.토큰")).isFalse();
    }
}