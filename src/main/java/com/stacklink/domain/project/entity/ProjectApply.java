package com.stacklink.domain.project.entity;

import com.stacklink.domain.project.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="project_apply")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectApply {
    @EmbeddedId
    private ProjectApplyId id;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private ApplicationStatus status;

    @Column(nullable=false, name="applied_at")
    private LocalDateTime applyAt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 20)
    private String position;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name= "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
}
