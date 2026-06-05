package com.stacklink.auth.dto;

import com.stacklink.domain.project.entity.Role;
import jakarta.validation.constraints.*;
import lombok.Getter;

// SignupRequest — 이름은 username으로, role은 선택값(기본 APPLICANT)
@Getter
public class SignupRequest {
    @NotBlank @Email @Size(max = 50)
    private String email;

    @NotBlank @Size(min = 8, max = 256)
    private String password;

    @NotBlank @Size(max = 20)
    private String nickname;

    @NotBlank @Size(max = 20)
    private String username;   // 폼의 "이름"

    @NotBlank
    private String phoneNumber;

    private Role role;         // 폼에서 안 받으면 null → 서비스에서 APPLICANT 처리

    private String position;
}