package com.stacklink.auth.oauth2;

import com.stacklink.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final SocialAuthProcessor socialAuthProcessor;

    /**
     * 소셜 로그인 콜백 처리.
     * super.loadUser()는 provider로의 HTTP 호출이므로 트랜잭션 밖에서 수행하고,
     * DB 조회/저장은 SocialAuthProcessor(@Transactional)에 위임한다.
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);  // 외부 HTTP (트랜잭션 X)

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo info = OAuth2UserInfoFactory
                .getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());

        User user = socialAuthProcessor.getOrCreate(registrationId, info);  // DB (트랜잭션 O)

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}