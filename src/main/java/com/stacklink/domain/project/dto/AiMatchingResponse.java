package com.stacklink.domain.project.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiMatchingResponse {

    // 추천 프로젝트 ID
    private Long projectId;

    // 프로젝트 이름
    private String projectName;

    // 프로젝트 내용
    private String content;

    // AI가 생성한 추천 이유
    private String reason;

    // AI 매칭 점수 (0.0 ~ 1.0)
    private Double score;
}