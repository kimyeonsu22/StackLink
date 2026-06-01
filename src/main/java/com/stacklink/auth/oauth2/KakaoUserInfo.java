package com.stacklink.auth.oauth2;

import java.util.Map;

/** 카카오 OAuth2 응답 파서 (kakao_account 내부에 정보 중첩) */
@SuppressWarnings("unchecked")
public class KakaoUserInfo extends OAuth2UserInfo {
    public KakaoUserInfo(Map<String, Object> attributes) { super(attributes); }

    @Override public String getProviderId() { return String.valueOf(attributes.get("id")); }

    @Override public String getEmail() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        return account != null ? (String) account.get("email") : null;
    }

    @Override public String getName() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        if (account == null) return null;
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");
        return profile != null ? (String) profile.get("nickname") : null;
    }
}