package com.stacklink.auth.oauth2;

import com.stacklink.auth.jwt.JwtTokenProvider;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;

    /** 소셜 로그인 성공 시 JWT를 발급하고 프론트엔드 콜백 URL로 토큰과 함께 리다이렉트 */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Long userId = principal.getUser().getId();
        String role = principal.getUser().getRole().getKey();

        String accessToken = tokenProvider.createAccessToken(userId, role);
        String refreshToken = tokenProvider.createRefreshToken(userId);

        // 프론트엔드(React)의 콜백 페이지로 토큰 전달
        String redirectUrl = String.format(
                "http://localhost:3000/oauth/callback?accessToken=%s&refreshToken=%s",
                URLEncoder.encode(accessToken, StandardCharsets.UTF_8),
                URLEncoder.encode(refreshToken, StandardCharsets.UTF_8));

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}