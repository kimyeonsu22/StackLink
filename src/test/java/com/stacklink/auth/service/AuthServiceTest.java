package com.stacklink.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stacklink.auth.dto.LoginRequest;
import com.stacklink.auth.dto.SignupRequest;
import com.stacklink.auth.dto.TokenResponse;
import com.stacklink.domain.project.entity.Role;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional   // 테스트 데이터는 끝나면 롤백
class AuthServiceTest {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private SignupRequest signup(String json) throws Exception {
        return objectMapper.readValue(json, SignupRequest.class);
    }

    private LoginRequest login(String json) throws Exception {
        return objectMapper.readValue(json, LoginRequest.class);
    }

    /**
     * 회원가입 성공 + role 미입력 시 기본 APPLICANT + 비밀번호 암호화 확인
     */
    @Test
    void 회원가입_성공_기본권한_APPLICANT() throws Exception {
        authService.signup(signup("""
                {
                  "email": "tester1@example.com",
                  "password": "password123",
                  "nickname": "테스터1",
                  "username": "김지원",
                  "phoneNumber": "010-1111-2222"
                }
                """));

        User saved = userRepository.findByEmail("tester1@example.com").orElseThrow();
        assertThat(saved.getNickname()).isEqualTo("테스터1");
        assertThat(saved.getUsername()).isEqualTo("김지원");      // 폼의 "이름"
        assertThat(saved.getRole()).isEqualTo(Role.APPLICANT);    // 기본값
        assertThat(saved.getPassword()).isNotEqualTo("password123"); // 암호화됨
    }

    /**
     * 이메일로 로그인 → JWT 발급
     */
    @Test
    void 이메일로_로그인하면_토큰발급() throws Exception {
        authService.signup(signup("""
                { "email": "login@example.com", "password": "password123",
                  "nickname": "로그인", "username": "이로그", "phoneNumber": "010-3333-4444" }
                """));

        TokenResponse token = authService.login(login("""
                { "email": "login@example.com", "password": "password123" }
                """));

        assertThat(token.getGrantType()).isEqualTo("Bearer");
        assertThat(token.getAccessToken()).isNotBlank();
        assertThat(token.getRefreshToken()).isNotBlank();
    }

    /**
     * 비밀번호 틀리면 예외
     */
    @Test
    void 잘못된_비밀번호_로그인_실패() throws Exception {
        authService.signup(signup("""
                { "email": "wrong@example.com", "password": "password123",
                  "nickname": "비번틀림", "username": "박틀림", "phoneNumber": "010-5555-6666" }
                """));

        assertThatThrownBy(() -> authService.login(login("""
                { "email": "wrong@example.com", "password": "다른비번" }
                """)))
                .isInstanceOf(IllegalArgumentException.class);
    }

    /**
     * 중복 이메일 가입 거부
     */
    @Test
    void 중복_이메일_가입_실패() throws Exception {
        authService.signup(signup("""
                { "email": "dup@example.com", "password": "password123",
                  "nickname": "원본", "username": "최원본", "phoneNumber": "010-7777-8888" }
                """));

        assertThatThrownBy(() -> authService.signup(signup("""
                { "email": "dup@example.com", "password": "password123",
                  "nickname": "다른닉", "username": "다른이름", "phoneNumber": "010-9999-0000" }
                """)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("이메일");
    }

    /**
     * 이메일/닉네임 중복확인 (true=사용가능)
     */
    @Test
    void 이메일_닉네임_중복확인() throws Exception {
        authService.signup(signup("""
                { "email": "check@example.com", "password": "password123",
                  "nickname": "체크닉", "username": "체크", "phoneNumber": "010-1212-3434" }
                """));

        assertThat(authService.isEmailAvailable("check@example.com")).isFalse();
        assertThat(authService.isEmailAvailable("new@example.com")).isTrue();
        assertThat(authService.isNicknameAvailable("체크닉")).isFalse();
        assertThat(authService.isNicknameAvailable("새닉")).isTrue();
    }
}