package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.User;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AdminUserResponse {

    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String role;
    private boolean isDeleted;
    private LocalDateTime createdAt;

    public static AdminUserResponse fromEntity(User u) {
        return AdminUserResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .nickname(u.getNickname())
                .email(u.getEmail())
                .phoneNumber(u.getPhoneNumber())
                .role(u.getRole().name())
                .isDeleted(u.isDeleted())
                .createdAt(u.getCreatedAt())
                .build();
    }
}