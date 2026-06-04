package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectMember {
    @EmbeddedId
    private ProjectMemberId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("projectId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    private LocalDateTime joinedAt;

    @Builder
    public ProjectMember(User user, Project project, LocalDateTime joinedAt) {
        this.id = new ProjectMemberId(user.getId(), project.getId());
        this.user = user;
        this.project = project;
        this.joinedAt = joinedAt;
    }
}
