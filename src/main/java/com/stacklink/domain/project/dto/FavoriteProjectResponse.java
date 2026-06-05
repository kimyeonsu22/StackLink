package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.ProjectFavorite;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FavoriteProjectResponse {

    private Long id;
    private String projectname;
    private Boolean isClosed;
    private LocalDateTime deadlineAt;

    public static FavoriteProjectResponse from(ProjectFavorite pf) {
        return FavoriteProjectResponse.builder()
                .id(pf.getProject().getId())
                .projectname(pf.getProject().getProjectName())
                .isClosed(pf.getProject().isClosed())
                .deadlineAt(pf.getProject().getDeadlineAt())
                .build();
    }
}
