package com.stacklink.domain.project.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class UserUpdateRequest {
    private String username;
    private String nickname;
    private String phoneNumber;
    private String password;       // 비어있으면 변경 안 함
    private String position;
    private Map<String, String> techStack; // { techName: careerDetail }
}
