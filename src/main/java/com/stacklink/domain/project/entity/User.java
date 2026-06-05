package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String username;

    // 소셜 회원은 비밀번호 없음 → nullable
    @Column(length = 256)
    private String password;

    @Column(nullable = false, length = 20, unique = true)
    private String nickname;

    // 소셜(특히 카카오)은 이메일 미제공 가능 → nullable
    @Column(length = 50, unique = true)
    private String email;

    // 소셜 가입 시 미입력 가능 → nullable
    @Column(name = "phone_number", length = 20, unique = true)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role;

    @Column(length = 20)
    private String position;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    /** 최초 저장 직전 생성/수정 시각 세팅 */
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /** 수정 직전 수정 시각 갱신 */
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /** 소셜 로그인 시 닉네임 등 갱신 */
    public void updateOAuthInfo(String nickname) {
        this.nickname = nickname;
    }

    /** 회원정보 수정 */
    public void updateProfile(String username, String nickname, String phoneNumber, String position) {
        this.username = username;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.updatedAt = java.time.LocalDateTime.now();
    }

    /** 비밀번호 변경 */
    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
        this.updatedAt = java.time.LocalDateTime.now();
    }

    /** 권한 변경 (관리자 기능용) */
    public void changeRole(Role role) {
        this.role = role;
    }
}