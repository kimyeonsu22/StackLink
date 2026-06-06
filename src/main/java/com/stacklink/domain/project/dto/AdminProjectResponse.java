package com.stacklink.domain.project.dto;

import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.TechProjects;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class AdminProjectResponse {

    private Long id;
    private String authorNickname;
    private String projectName;
    private String content;
    private String projectCategory;
    private String projectType;
    private Integer recruitCount;
    private Boolean isClosed;
    private Integer viewCount;
    private Integer favoriteCount;
    private LocalDateTime createdAt;
    private LocalDateTime deadlineAt;
    private LocalDateTime projectStart;
    private LocalDateTime projectEnd;
    private Boolean isDeleted;
    private List<String> tags;
    private long applyCount;

    public static AdminProjectResponse fromEntity(Project p, List<TechProjects> techProjects, long applyCount) {
        return AdminProjectResponse.builder()
                .id(p.getId())
                .authorNickname(p.getAuthor() != null ? p.getAuthor().getNickname() : "-")
                .projectName(p.getProjectName())
                .content(p.getContent())
                .projectCategory(p.getProjectCategory())
                .projectType(p.getProjectType())
                .recruitCount(p.getRecruitCount())
                .isClosed(p.isClosed())
                .viewCount(p.getViewCount())
                .favoriteCount(p.getFavoriteCount())
                .createdAt(p.getCreatedAt())
                .deadlineAt(p.getDeadlineAt())
                .projectStart(p.getProjectStartDate())
                .projectEnd(p.getProjectEndDate())
                .isDeleted(p.isDeleted())
                .tags(techProjects.stream().map(tp -> tp.getTech().getTechName()).toList())
                .applyCount(applyCount)
                .build();
    }
}