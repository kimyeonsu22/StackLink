package com.stacklink.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {
    private String grantType;     // "Bearer"
    private String accessToken;
    private String refreshToken;
    private String role;
    private String nickname;

    @JsonProperty("isSubscribed")
    private boolean isSubscribed;
}