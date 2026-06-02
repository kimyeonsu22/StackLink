package com.stacklink.auth.oauth2;

import java.util.Map;

/** 네이버 OAuth2 응답 파서 (response 내부에 정보 중첩) */
@SuppressWarnings("unchecked")
public class NaverUserInfo extends OAuth2UserInfo {
    private final Map<String, Object> response;

    public NaverUserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.response = (Map<String, Object>) attributes.get("response");
    }

    @Override public String getProviderId() { return (String) response.get("id"); }
    @Override public String getEmail()      { return (String) response.get("email"); }
    @Override public String getName()       { return (String) response.get("nickname"); }
}