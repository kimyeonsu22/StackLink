package com.stacklink.auth.oauth2;

import java.util.Map;

public class OAuth2UserInfoFactory {

    /** registrationId(kakao/naver/google)에 따라 알맞은 파서 반환 */
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId,
                                                   Map<String, Object> attributes) {
        return switch (registrationId.toLowerCase()) {
            case "google" -> new GoogleUserInfo(attributes);
            case "kakao"  -> new KakaoUserInfo(attributes);
            case "naver"  -> new NaverUserInfo(attributes);
            default -> throw new IllegalArgumentException("지원하지 않는 로그인 플랫폼: " + registrationId);
        };
    }
}