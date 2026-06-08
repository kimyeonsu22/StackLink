package com.stacklink.auth.oauth2;

import com.stacklink.domain.project.entity.User; // 본인 프로젝트의 User 엔티티 경로
import com.stacklink.domain.project.repository.UserRepository; // UserRepository 경로
import com.stacklink.domain.project.entity.Role; // Role Enum 경로 (USER가 정의된 곳)
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor // 1. 필수: final 변수들의 생성자를 자동 생성하여 주입해 줍니다.
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    // 2. 필수: DB 접근과 비밀번호 암호화를 위한 객체 주입
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 구글에서 기본 사용자 정보를 가져옴
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 3. oAuth2UserInfo 대신 여기서 직접 정보를 추출합니다.
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // DB에 이미 있는 유저인지 확인 (메서드명은 본인 Repo sitory에 맞게 수정)
        User userEntity = userRepository.findByEmail(email).orElse(null);

        // 처음 로그인하는 회원이라면 강제 회원가입 처리
        if (userEntity == null) {
            String dummyPassword = UUID.randomUUID().toString();
            String encodedPassword = passwordEncoder.encode(dummyPassword);

            userEntity = User.builder()
                    .email(email)
                    .nickname(name)
                    .password(encodedPassword)
                    .role(Role.APPLICANT) // 4. USER 대신 Role.USER 처럼 프로젝트의 Enum 사용
                    .build();

            userRepository.save(userEntity);
        }

        // 로그인 처리를 위해 PrincipalDetails(본인이 구현한 객체) 반환
        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}