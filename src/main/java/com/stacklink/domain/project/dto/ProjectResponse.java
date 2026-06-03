package com.stacklink.domain.project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProjectResponse {

    private Long id;

    private Long userId;

    private String authorName;

    private String projectname;

    private String title;

    private String content;

    private Integer recruitCount;

    private Boolean isClosed;

    private Integer viewCount;

    private Integer favoriteCount;

    private LocalDateTime deadlineAt;
}