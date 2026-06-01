package com.stacklink.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_favorite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectFavorite {

    @EmbeddedId
    private ProjectFavoriteId id;
}