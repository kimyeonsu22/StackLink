package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.Project;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ProjectResponse {

    private Long id;

    private Long userId;

    private String authorName;

    private String projectname;


    private String content;

    private Integer recruitCount;

    private Boolean isClosed;

    private Integer viewCount;

    private Integer favoriteCount;

    private LocalDateTime deadlineAt;

    private LocalDateTime createdAt;

    // !!!!! 기술 스택 담아야함 !!!!
    private List<String> tags;

    public static ProjectResponse from(Project p) {
        return ProjectResponse.builder()
                .id(p.getId())
                .projectname(p.getProjectName())
                .favoriteCount(p.getFavoriteCount())
                .build();
    }
}