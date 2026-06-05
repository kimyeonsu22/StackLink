package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.ProjectApply;
import com.stacklink.domain.project.entity.TechUsers;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ProjectApplyResponse {
    private Long userId;
    private Long projectId;
    private String position;
    private String content;
    private String status;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String userPosition;
    private List<TechCareer> techStack;

    @Getter
    @Builder
    public static class TechCareer {
        private String tech;
        private String career;
    }

    public static ProjectApplyResponse from(ProjectApply apply, List<TechUsers> techUsers) {
        return ProjectApplyResponse.builder()
                .userId(apply.getId().getUserId())
                .projectId(apply.getId().getProjectId())
                .position(apply.getPosition())
                .content(apply.getContent())
                .status(apply.getStatus().name())
                .nickname(apply.getUser().getNickname())
                .email(apply.getUser().getEmail())
                .phoneNumber(apply.getUser().getPhoneNumber())
                .userPosition(apply.getUser().getPosition())
                .techStack(techUsers.stream()
                        .map(tu -> TechCareer.builder()
                                .tech(tu.getTech().getTechName())
                                .career(tu.getCareer() != null ? tu.getCareer().getCareerDetail() : null)
                                .build())
                        .toList())
                .build();
    }
}
