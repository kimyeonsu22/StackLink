package com.stacklink.domain.project.entity;

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

    @Column(nullable=false, name="applied_at")
    private LocalDateTime applyAt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 20)
    private String position;

//    @Column(name="is_deleted")
//    private Boolean deleted;
}
