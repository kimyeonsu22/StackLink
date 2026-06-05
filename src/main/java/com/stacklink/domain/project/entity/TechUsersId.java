package com.stacklink.domain.project.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TechUsersId implements Serializable {

    private Long userId;
    private Long techId;
}
