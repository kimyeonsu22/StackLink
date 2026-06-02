package com.stacklink.auth.dto;

import com.stacklink.domain.project.entity.Role;
import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class SignupRequest {

    @NotBlank @Size(max = 20)
    private String username;

    @NotBlank @Size(min = 8, max = 256)
    private String password;

    @NotBlank @Size(max = 20)
    private String nickname;

    @NotBlank @Email @Size(max = 50)
    private String email;

    @NotBlank
    private String phoneNumber;

    // 가입 시 구직(APPLICANT) / 채용(RECRUITER) 선택. ADMIN은 가입 불가
    @NotNull
    private Role role;
}