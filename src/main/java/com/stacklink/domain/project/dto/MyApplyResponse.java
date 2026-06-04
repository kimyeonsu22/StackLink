package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.ProjectApply;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

// 내가 지원한 공고 보여주는 dto
@Getter
@Builder
public class MyApplyResponse {

    private Long projectId;
    private String projectname;
    private String position;
    private String status;
    private LocalDateTime appliedAt;
    private Boolean isClosed;

    public static MyApplyResponse from(ProjectApply apply) {
        return MyApplyResponse.builder()
                .projectId(apply.getId().getProjectId())
                .projectname(apply.getProject().getProjectName())
                .position(apply.getPosition())
                .status(apply.getStatus().name())
                .appliedAt(apply.getApplyAt())
                .isClosed(apply.getProject().isClosed())
                .build();
    }
}
