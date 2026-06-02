package com.stacklink.domain.project.entity;

import com.stacklink.domain.project.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_favorite")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectFavorite {

    @EmbeddedId
    private ProjectFavoriteId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("projectId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    /** 즐겨찾기 생성 시 복합키 자동 세팅 */
    public ProjectFavorite(User user, Project project) {
        this.user = user;
        this.project = project;
        this.id = new ProjectFavoriteId(user.getId(), project.getId());
    }
}