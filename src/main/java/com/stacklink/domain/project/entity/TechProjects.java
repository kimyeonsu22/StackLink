package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.*;

// 기술_프로젝트 테이블 존재안해서 만듬
@Entity
@Table(name = "project_tech")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TechProjects {

    @EmbeddedId
    private TechProjectsId id;

    @MapsId("techId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_id")
    private Tech tech;

    @MapsId("projectId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public TechProjects(Tech tech, Project project) {
        this.id = new TechProjectsId(tech.getId(), project.getId());
        this.tech = tech;
        this.project = project;
    }
}
