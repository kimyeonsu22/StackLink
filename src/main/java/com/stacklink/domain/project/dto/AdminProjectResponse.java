package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.Project;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AdminProjectResponse {

    private Long id;
    private String authorNickname;
    private String projectName;
    private String title;
    private String content;
    private Integer recruitCount;
    private Boolean isClosed;
    private Integer viewCount;
    private Integer favoriteCount;
    private LocalDateTime createdAt;
    private LocalDateTime deadlineAt;
    private Boolean isDeleted;

    public static AdminProjectResponse fromEntity(Project p) {
        return AdminProjectResponse.builder()
                .id(p.getId())
                .authorNickname(p.getAuthor() != null ? p.getAuthor().getNickname() : "-")
                .projectName(p.getProjectName())
                .title(p.getTitle())
                .content(p.getContent())
                .recruitCount(p.getRecruitCount())
                .isClosed(p.isClosed())
                .viewCount(p.getViewCount())
                .favoriteCount(p.getFavoriteCount())
                .createdAt(p.getCreatedAt())
                .deadlineAt(p.getDeadlineAt())
                .isDeleted(p.isDeleted())
                .build();
    }
}