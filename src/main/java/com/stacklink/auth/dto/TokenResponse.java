package com.stacklink.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {
    private String grantType;     // "Bearer"
    private String accessToken;
    private String refreshToken;
}