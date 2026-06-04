package com.stacklink.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "sub_state")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 회원 ID
    private Long userId;

    // 구독 모델 ID (subscribe 테이블 참조)
    private Long subId;

    // 구독 시작일
    private LocalDateTime startDate;

    // 구독 만료일
    private LocalDateTime finishDate;

    // 구독 활성 여부 (true = 구독중, false = 미구독)
    private Boolean subState;
}