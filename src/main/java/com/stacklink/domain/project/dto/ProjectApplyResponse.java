package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.ProjectApply;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectApplyResponse {
    private Long userId;
    private Long projectId;
    private String position;
    private String content;
    private String status;

    public static ProjectApplyResponse from(ProjectApply apply) {
        return ProjectApplyResponse.builder()
                .userId(apply.getId().getUserId())
                .projectId(apply.getId().getProjectId())
                .position(apply.getPosition())
                .content(apply.getContent())
                .status(apply.getStatus().name()).build();
    }
}
