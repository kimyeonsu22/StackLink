package com.stacklink.auth.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";

    private final SecretKey key;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-validity}") long accessTokenValidity,
            @Value("${jwt.refresh-token-validity}") long refreshTokenValidity) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenValidity = accessTokenValidity;
        this.refreshTokenValidity = refreshTokenValidity;
    }

    /** Access Token 생성 (type=access, 권한 포함) */
    public String createAccessToken(Long userId, String role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("type", TYPE_ACCESS)
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + accessTokenValidity))
                .signWith(key)
                .compact();
    }

    /** Refresh Token 생성 (type=refresh, 권한 미포함) */
    public String createRefreshToken(Long userId) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("type", TYPE_REFRESH)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + refreshTokenValidity))
                .signWith(key)
                .compact();
    }

    /** 토큰에서 Authentication 추출 (access 토큰 전용) */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);
        String role = claims.get("role", String.class);

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(role.split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /** 서명·만료 유효성 검증 */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch ( JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /** access 타입 토큰인지 확인 (refresh 토큰을 인증에 쓰는 것 차단) */
    public boolean isAccessToken(String token) {
        try {
            return TYPE_ACCESS.equals(parseClaims(token).get("type", String.class));
        } catch (Exception e) {
            return false;
        }
    }

    /** refresh 토큰의 userId 추출 (재발급 API용) */
    public Long getUserId(String token) {
        return Long.valueOf(parseClaims(token).getSubject());
    }

    /** Claims 파싱 (만료 토큰도 Claims 반환) */
    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}