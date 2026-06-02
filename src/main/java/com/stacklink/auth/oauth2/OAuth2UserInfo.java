package com.stacklink.auth.oauth2;

import java.util.Map;

/**
 * 카카오/네이버/구글의 서로 다른 응답 포맷을 동일 인터페이스로 추출하기 위한 추상 클래스
 */
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    /** 플랫폼이 발급한 고유 사용자 ID */
    public abstract String getProviderId();

    /** 이메일 */
    public abstract String getEmail();

    /** 닉네임/이름 */
    public abstract String getName();
}