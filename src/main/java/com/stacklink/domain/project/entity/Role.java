package com.stacklink.domain.project.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 사용자 권한 등급 정의
 * ADMIN     : 서비스 관리자 (전체 관리 권한)
 * RECRUITER : 채용 글 작성 회원 (프로젝트 등록/지원자 관리)
 * APPLICANT : 구직 회원 (프로젝트 지원)
 */
@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN("ROLE_ADMIN"),
    //RECRUITER("ROLE_RECRUITER"), -> 사용안해서 수정, 관리자가 아닌 회원은 그냥 applicant로 구분
    APPLICANT("ROLE_APPLICANT");

    private final String key;
}