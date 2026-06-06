package com.stacklink.domain.project.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project_tech")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTech {

    @EmbeddedId
    private ProjectTechId id;

    @Column(name = "career_detail", nullable = false, length = 20)
    private String careerDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name= "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("techId")
    @JoinColumn(name= "tech_id")
    private Tech tech;

    @Builder
    public ProjectTech(Project project, Tech tech, String careerDetail) {
        this.id = new ProjectTechId(project.getId(), tech.getId());
        this.project = project;
        this.tech = tech;
        this.careerDetail = careerDetail;
    }
}
