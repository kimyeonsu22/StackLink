package com.stacklink.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

// 공고 상세 페이지 오른쪽 화면에 띄워주기 위함
@Getter
@Builder
public class PublicUserResponse {

    private Long id;
    private String nickname;
    private String position;
    private long followerCount;
    private long projectCount;
}
