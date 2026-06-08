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


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Long userId = principal.getUser().getId();
        String role = principal.getUser().getRole().getKey();

        // User 엔티티에서 닉네임을 가져옵니다 (메서드명은 실제 구현에 맞게 수정 필요)
        String nickname = principal.getUser().getNickname();

        String accessToken = tokenProvider.createAccessToken(userId, role);
        String refreshToken = tokenProvider.createRefreshToken(userId);

        // 프론트엔드에서 기대하는 4가지 파라미터를 모두 담아서 전달
        String redirectUrl = String.format(
                "http://localhost:3000/oauth/callback?accessToken=%s&refreshToken=%s&role=%s&nickname=%s",
                URLEncoder.encode(accessToken, StandardCharsets.UTF_8),
                URLEncoder.encode(refreshToken, StandardCharsets.UTF_8),
                URLEncoder.encode(role, StandardCharsets.UTF_8),
                URLEncoder.encode(nickname, StandardCharsets.UTF_8)
        );

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}