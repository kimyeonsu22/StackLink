package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "social",
        uniqueConstraints = @UniqueConstraint(columnNames = {"platform", "platform_id"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Social {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 한 유저는 플랫폼별로 1개의 소셜 연동만 가진다는 전제 (user_id unique)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 10)
    private String platform;       // kakao, naver, google

    @Column(name = "platform_id", nullable = false, length = 100)
    private String platformId;     // 각 플랫폼이 발급한 고유 ID

    @Column(name = "connected_at", nullable = false)
    private LocalDateTime connectedAt;

    @PrePersist
    public void prePersist() {
        this.connectedAt = LocalDateTime.now();
    }
}