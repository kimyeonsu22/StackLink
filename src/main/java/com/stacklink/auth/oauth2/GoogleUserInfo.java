package com.stacklink.auth.oauth2;

import java.util.Map;

/** 구글 OAuth2 응답 파서 */
public class GoogleUserInfo extends OAuth2UserInfo {
    public GoogleUserInfo(Map<String, Object> attributes) { super(attributes); }

    @Override public String getProviderId() { return (String) attributes.get("sub"); }
    @Override public String getEmail()      { return (String) attributes.get("email"); }
    @Override public String getName()       { return (String) attributes.get("name"); }
}