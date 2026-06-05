package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class UserResponse {

    // 내 페이지에서 유저정보 가져오기 위해 만든 페이지

    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String position;
    private String role;
    private long followerCount;
    private long followingCount;
    private Map<String, String> techStack; // { techName: careerDetail }
    private boolean isPro;

    public static UserResponse of(User user, long followerCount, long followingCount, Map<String, String> techStack, boolean isPro) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .position(user.getPosition())
                .role(user.getRole().name())
                .followerCount(followerCount)
                .followingCount(followingCount)
                .techStack(techStack)
                .isPro(isPro)
                .build();
    }
}
