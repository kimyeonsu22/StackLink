package com.stacklink.domain.project.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProjectFavoriteId implements Serializable {

    private Long userId;

    private Long projectId;
}