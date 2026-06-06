package com.stacklink.domain.project.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProjectTechId implements Serializable {
    private Long projectId;
    private Long techId;
}
