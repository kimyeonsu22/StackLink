package com.stacklink.domain.project.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

// 기술_프로젝트 아이디 테이블
@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TechProjectsId implements Serializable {

    private Long techId;
    private Long projectId;
}
